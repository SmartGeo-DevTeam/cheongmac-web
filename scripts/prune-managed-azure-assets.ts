import { BlobServiceClient } from '@azure/storage-blob';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'node:fs';
import path from 'node:path';
import { PrismaClient } from '../src/generated/prisma/client';

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;

  for (const rawLine of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]] !== undefined) continue;

    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

loadEnvFile(path.resolve('.env.local'));
loadEnvFile(path.resolve('.env'));

function requiredEnv(name: 'AZURE_STORAGE_CONNECTION_STRING' | 'DATABASE_URL') {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name}이 없습니다.`);
  return value;
}

const containerName =
  process.env.AZURE_STORAGE_PUBLIC_CONTAINER?.trim() || 'assets';
const publicBase = (
  process.env.NEXT_PUBLIC_AZURE_ASSET_BASE_URL?.trim() ||
  'https://cheongmacmedia.blob.core.windows.net/assets'
).replace(/\/+$/, '');
const shouldDelete = process.argv.includes('--delete');
const graceHours = Number.parseInt(
  process.argv.find((arg) => arg.startsWith('--grace-hours='))?.split('=')[1] || '24',
  10,
);

function collectStrings(value: unknown, output: Set<string>) {
  if (typeof value === 'string') {
    output.add(value.trim());
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, output);
    return;
  }

  if (value && typeof value === 'object') {
    for (const item of Object.values(value as Record<string, unknown>)) {
      collectStrings(item, output);
    }
  }
}

function managedBlobName(url: string) {
  try {
    const base = new URL(`${publicBase}/`);
    const target = new URL(url);
    if (base.origin !== target.origin) return null;

    const basePath = base.pathname.endsWith('/') ? base.pathname : `${base.pathname}/`;
    if (!target.pathname.startsWith(basePath)) return null;

    const name = target.pathname
      .slice(basePath.length)
      .split('/')
      .map((segment) => decodeURIComponent(segment))
      .join('/');

    return name.startsWith('managed/') ? name : null;
  } catch {
    return null;
  }
}

async function main() {
  const connectionString = requiredEnv('AZURE_STORAGE_CONNECTION_STRING');
  const databaseUrl = requiredEnv('DATABASE_URL');

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
  });

  try {
    const [doctorImages, managedItems] = await Promise.all([
      prisma.doctorImage.findMany({ select: { url: true } }),
      prisma.managedPageItem.findMany({ select: { data: true } }),
    ]);

    const strings = new Set<string>();
    for (const image of doctorImages) collectStrings(image.url, strings);
    for (const item of managedItems) collectStrings(item.data, strings);

    const referenced = new Set(
      Array.from(strings)
        .map(managedBlobName)
        .filter((name): name is string => Boolean(name)),
    );

    const service = BlobServiceClient.fromConnectionString(connectionString);
    const container = service.getContainerClient(containerName);
    const cutoff = Date.now() - Math.max(1, graceHours) * 60 * 60 * 1000;
    const orphaned: Array<{ name: string; lastModified?: Date }> = [];

    for await (const blob of container.listBlobsFlat({ prefix: 'managed/' })) {
      if (referenced.has(blob.name)) continue;
      if (blob.properties.lastModified && blob.properties.lastModified.getTime() > cutoff) continue;
      orphaned.push({ name: blob.name, lastModified: blob.properties.lastModified });
    }

    console.log(`DB에서 사용 중인 managed Blob: ${referenced.size}개`);
    console.log(`정리 후보 (${graceHours}시간 유예): ${orphaned.length}개`);

    for (const item of orphaned) {
      console.log(
        `${shouldDelete ? 'DELETE' : 'DRY-RUN'}  ${item.name}` +
          (item.lastModified ? `  (${item.lastModified.toISOString()})` : ''),
      );
    }

    if (!shouldDelete) {
      console.log('\n실제 삭제는 다음 명령으로 실행하세요:');
      console.log('npm run assets:prune:managed -- --delete');
      return;
    }

    let deleted = 0;
    for (const item of orphaned) {
      const result = await container
        .getBlobClient(item.name)
        .deleteIfExists({ deleteSnapshots: 'include' });
      if (result.succeeded) deleted += 1;
    }

    console.log(`\n정리 완료: ${deleted}개 Blob 삭제 요청`);
    console.log('현재 Blob soft delete 7일 설정 때문에 Azure에서는 7일간 복구 가능한 상태로 보존됩니다.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('❌ managed Blob 정리 중 오류가 발생했습니다.');
  console.error(error);
  process.exitCode = 1;
});
