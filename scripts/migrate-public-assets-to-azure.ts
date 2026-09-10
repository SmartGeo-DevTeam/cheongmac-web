import { BlobServiceClient } from '@azure/storage-blob';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;

  for (const rawLine of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;

    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadEnvFile(path.resolve('.env.local'));
loadEnvFile(path.resolve('.env'));

function requiredConnectionString() {
  const value = process.env.AZURE_STORAGE_CONNECTION_STRING?.trim();

  if (!value) {
    throw new Error(
      'AZURE_STORAGE_CONNECTION_STRING이 없습니다. .env.local에 먼저 설정해주세요.',
    );
  }

  return value;
}

const containerName =
  process.env.AZURE_STORAGE_PUBLIC_CONTAINER?.trim() || 'assets';
const publicBase = (
  process.env.NEXT_PUBLIC_AZURE_ASSET_BASE_URL?.trim() ||
  'https://cheongmacmedia.blob.core.windows.net/assets'
).replace(/\/+$/, '');
const root = path.resolve('public/assets');
const deleteLocal = process.argv.includes('--delete-local');

function walk(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function mimeType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  const table: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.pdf': 'application/pdf',
    '.json': 'application/json; charset=utf-8',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.txt': 'text/plain; charset=utf-8',
  };

  return table[ext] || 'application/octet-stream';
}

function sha256(buffer: Buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function publicUrl(blobName: string) {
  return `${publicBase}/${blobName
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')}`;
}

async function mapLimit<T>(
  values: T[],
  limit: number,
  handler: (value: T, index: number) => Promise<void>,
) {
  let cursor = 0;

  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      await handler(values[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, values.length) }, () => worker()),
  );
}

async function assertAnonymousRead(url: string) {
  let lastStatus = 0;

  for (let attempt = 1; attempt <= 9; attempt += 1) {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      cache: 'no-store',
    });
    lastStatus = response.status;

    if (response.ok) return;
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(attempt * 1000, 5000)),
    );
  }

  throw new Error(
    `익명 읽기 검증 실패 (${lastStatus}): ${url}\n` +
      'Azure Storage 계정의 "Blob 익명 액세스 허용"과 assets 컨테이너의 익명 액세스 수준 "Blob"을 확인해주세요.',
  );
}

async function main() {
  const files = walk(root);

  if (!files.length) {
    console.log('public/assets에 옮길 파일이 없습니다.');
    return;
  }

  console.log(`이관 대상: ${files.length}개`);
  console.log(`Azure: ${publicBase}/static/...`);

  const connectionString = requiredConnectionString();
  const service = BlobServiceClient.fromConnectionString(connectionString);
  const container = service.getContainerClient(containerName);

  await container.createIfNotExists({ access: 'blob' });

  try {
    await container.setAccessPolicy('blob');
  } catch (error) {
    console.warn(
      'assets 컨테이너의 Blob 공개 읽기 설정을 자동 적용하지 못했습니다. 기존 설정을 계속 검증합니다.',
    );
    console.warn(error);
  }

  let uploaded = 0;
  let skipped = 0;

  await mapLimit(files, 6, async (filePath, index) => {
    const relative = path.relative(root, filePath).split(path.sep).join('/');
    const blobName = `static/${relative}`;
    const buffer = fs.readFileSync(filePath);
    const digest = sha256(buffer);
    const blob = container.getBlockBlobClient(blobName);

    let alreadyValid = false;

    if (await blob.exists()) {
      const properties = await blob.getProperties();
      alreadyValid =
        properties.contentLength === buffer.length &&
        properties.metadata?.sha256 === digest;
    }

    if (!alreadyValid) {
      await blob.uploadData(buffer, {
        blobHTTPHeaders: {
          blobContentType: mimeType(filePath),
          blobCacheControl: 'public, max-age=3600',
        },
        metadata: {
          sha256: digest,
          migratedFrom: 'public-assets',
        },
      });
      uploaded += 1;
    } else {
      skipped += 1;
    }

    const verified = await blob.getProperties();
    if (
      verified.contentLength !== buffer.length ||
      verified.metadata?.sha256 !== digest
    ) {
      throw new Error(`Azure 검증 실패: ${relative}`);
    }

    if ((index + 1) % 25 === 0 || index + 1 === files.length) {
      console.log(`업로드 검증: ${index + 1}/${files.length}`);
    }
  });

  console.log('브라우저 익명 읽기 검증을 시작합니다.');
  await mapLimit(files, 8, async (filePath, index) => {
    const relative = path.relative(root, filePath).split(path.sep).join('/');
    await assertAnonymousRead(publicUrl(`static/${relative}`));

    if ((index + 1) % 50 === 0 || index + 1 === files.length) {
      console.log(`공개 읽기 검증: ${index + 1}/${files.length}`);
    }
  });

  console.log(`완료: 새 업로드 ${uploaded}개 / 기존 일치 ${skipped}개`);

  if (!deleteLocal) {
    console.log('로컬 파일은 유지했습니다. 제거하려면 --delete-local 옵션을 사용하세요.');
    return;
  }

  fs.rmSync(root, { recursive: true, force: true });
  console.log('모든 검증이 끝나 public/assets를 제거했습니다.');
}

main().catch((error) => {
  console.error('\n❌ Azure 에셋 이관 실패');
  console.error(error);
  console.error('public/assets 원본은 삭제하지 않았습니다.');
  process.exitCode = 1;
});
