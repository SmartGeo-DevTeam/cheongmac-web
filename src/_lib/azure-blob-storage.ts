import { BlobServiceClient } from '@azure/storage-blob';
import crypto from 'node:crypto';

const DEFAULT_CONTAINER = 'assets';
const DEFAULT_PUBLIC_BASE_URL =
  'https://cheongmacmedia.blob.core.windows.net/assets';
const MANAGED_PREFIX = 'managed/';

function requiredConnectionString() {
  const value = process.env.AZURE_STORAGE_CONNECTION_STRING?.trim();

  if (!value) {
    throw new Error(
      'AZURE_STORAGE_CONNECTION_STRING이 설정되어 있지 않습니다.',
    );
  }

  return value;
}

export function getAzurePublicContainerName() {
  return (
    process.env.AZURE_STORAGE_PUBLIC_CONTAINER?.trim() ||
    DEFAULT_CONTAINER
  );
}

export function getAzureAssetBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_AZURE_ASSET_BASE_URL?.trim() ||
    DEFAULT_PUBLIC_BASE_URL
  ).replace(/\/+$/, '');
}

export function getAzurePublicContainerClient() {
  const service = BlobServiceClient.fromConnectionString(
    requiredConnectionString(),
  );

  return service.getContainerClient(getAzurePublicContainerName());
}

function sanitizeSegment(value: string) {
  const normalized = value
    .trim()
    .replace(/\\/g, '-')
    .replace(/\/+/g, '-')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);

  return normalized || 'asset';
}

function extensionForFile(file: File) {
  const original = file.name
    .split('.')
    .pop()
    ?.toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  const mimeExtensions: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
  };

  return mimeExtensions[file.type] || original || 'bin';
}

export function buildAzurePublicAssetUrl(blobName: string) {
  const encoded = blobName
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `${getAzureAssetBaseUrl()}/${encoded}`;
}

export function getAzureBlobNameFromPublicUrl(url: string) {
  const candidate = url.trim();
  if (!candidate) return null;

  try {
    const base = new URL(`${getAzureAssetBaseUrl()}/`);
    const target = new URL(candidate);

    if (base.origin !== target.origin) return null;

    const basePath = base.pathname.endsWith('/')
      ? base.pathname
      : `${base.pathname}/`;

    if (!target.pathname.startsWith(basePath)) return null;

    const encodedName = target.pathname.slice(basePath.length);
    if (!encodedName) return null;

    return encodedName
      .split('/')
      .map((segment) => decodeURIComponent(segment))
      .join('/');
  } catch {
    return null;
  }
}

export function isManagedAzureAssetUrl(url: string) {
  return getAzureBlobNameFromPublicUrl(url)?.startsWith(MANAGED_PREFIX) ?? false;
}

export async function uploadManagedImage(
  file: File,
  scopeSegments: string[],
) {
  const container = getAzurePublicContainerClient();
  const blobName = [
    'managed',
    ...scopeSegments.map(sanitizeSegment),
    `${Date.now()}-${crypto.randomUUID()}.${extensionForFile(file)}`,
  ].join('/');

  const bytes = Buffer.from(await file.arrayBuffer());
  const blob = container.getBlockBlobClient(blobName);

  await blob.uploadData(bytes, {
    blobHTTPHeaders: {
      blobContentType: file.type || 'application/octet-stream',
      blobCacheControl: 'public, max-age=31536000, immutable',
    },
    metadata: {
      managed: 'true',
      uploadedAt: new Date().toISOString(),
    },
  });

  return {
    blobName,
    url: buildAzurePublicAssetUrl(blobName),
  };
}

export async function deleteManagedAzureAssetByUrl(url: string) {
  const blobName = getAzureBlobNameFromPublicUrl(url);
  if (!blobName?.startsWith(MANAGED_PREFIX)) return false;

  const container = getAzurePublicContainerClient();
  await container
    .getBlobClient(blobName)
    .deleteIfExists({ deleteSnapshots: 'include' });

  return true;
}

export async function deleteManagedAzureAssets(urls: Iterable<string>) {
  const unique = Array.from(
    new Set(
      Array.from(urls)
        .map((url) => url.trim())
        .filter(Boolean),
    ),
  );

  const failed: string[] = [];
  let deleted = 0;

  for (const url of unique) {
    if (!isManagedAzureAssetUrl(url)) continue;

    try {
      const removed = await deleteManagedAzureAssetByUrl(url);
      if (removed) deleted += 1;
    } catch (error) {
      failed.push(url);
      console.error('[azure-assets] Blob 삭제 실패:', url, error);
    }
  }

  return { deleted, failed };
}
