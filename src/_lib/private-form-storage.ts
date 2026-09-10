import 'server-only';

const BUCKET =
  process.env.SUPABASE_FORM_ATTACHMENTS_BUCKET?.trim() ||
  'form-attachments';

function settings() {
  return {
    url: process.env.SUPABASE_URL?.trim(),
    key: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  };
}

async function storageRequest(
  path: string,
  init: RequestInit = {},
) {
  const { url, key } = settings();
  if (!url || !key) {
    throw new Error(
      '첨부파일 저장을 사용하려면 SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY가 필요합니다.',
    );
  }

  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${key}`);
  headers.set('apikey', key);

  return fetch(`${url.replace(/\/$/, '')}/storage/v1${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });
}

async function ensureBucket() {
  const existing = await storageRequest(
    `/bucket/${encodeURIComponent(BUCKET)}`,
    { method: 'GET' },
  );

  if (existing.ok) return;

  const created = await storageRequest('/bucket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: false,
      file_size_limit: 5242880,
      allowed_mime_types: [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/gif',
        'application/pdf',
      ],
    }),
  });

  if (!created.ok && created.status !== 409) {
    throw new Error('첨부파일 저장소를 준비하지 못했습니다.');
  }
}

function safeExtension(file: File) {
  const extension = file.name
    .split('.')
    .pop()
    ?.replace(/[^a-z0-9]/gi, '')
    .toLowerCase();

  if (extension) return extension;
  if (file.type === 'application/pdf') return 'pdf';
  if (file.type === 'image/jpeg') return 'jpg';
  if (file.type === 'image/webp') return 'webp';
  if (file.type === 'image/gif') return 'gif';
  return 'png';
}

export async function uploadPrivateFormAttachment(
  file: File,
  folder: string,
) {
  if (file.size <= 0) return null;
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('첨부파일은 5MB 이하만 업로드할 수 있습니다.');
  }

  const allowed = new Set([
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',
    'application/pdf',
  ]);

  if (!allowed.has(file.type)) {
    throw new Error('이미지 또는 PDF 파일만 첨부할 수 있습니다.');
  }

  await ensureBucket();

  const objectPath = `${folder}/${crypto.randomUUID()}.${safeExtension(file)}`;
  const encodedPath = objectPath
    .split('/')
    .map(encodeURIComponent)
    .join('/');

  const upload = await storageRequest(
    `/object/${encodeURIComponent(BUCKET)}/${encodedPath}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
        'x-upsert': 'false',
      },
      body: file,
    },
  );

  if (!upload.ok) {
    throw new Error('첨부파일 업로드에 실패했습니다.');
  }

  return objectPath;
}

export async function createPrivateAttachmentUrl(
  objectPath: string | null | undefined,
  expiresIn = 900,
) {
  if (!objectPath) return null;

  try {
    const encodedPath = objectPath
      .split('/')
      .map(encodeURIComponent)
      .join('/');

    const response = await storageRequest(
      `/object/sign/${encodeURIComponent(BUCKET)}/${encodedPath}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expiresIn }),
      },
    );

    if (!response.ok) return null;

    const payload = (await response.json()) as {
      signedURL?: string;
      signedUrl?: string;
    };
    const signedPath = payload.signedURL ?? payload.signedUrl;
    if (!signedPath) return null;

    const { url } = settings();
    if (!url) return null;

    return signedPath.startsWith('http')
      ? signedPath
      : `${url.replace(/\/$/, '')}/storage/v1${signedPath}`;
  } catch {
    return null;
  }
}
