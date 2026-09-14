import { prisma } from '@/_lib/prisma';
import {
  PUBLIC_PAGE_COPY,
  type PublicPageCopyPath,
} from '@/_lib/public-page-copy';
import { Prisma } from '@/generated/prisma/client';

async function main() {
  const paths = Object.keys(PUBLIC_PAGE_COPY) as PublicPageCopyPath[];

  let created = 0;
  let existing = 0;

  for (const path of paths) {
    const config = PUBLIC_PAGE_COPY[path];

    const found = await prisma.pageContentBlock.findUnique({
      where: {
        pageKey_sectionKey: {
          pageKey: 'page-copy',
          sectionKey: path,
        },
      },
      select: {
        id: true,
        data: true,
      },
    });

    if (found) {
      existing += 1;

      const existingData =
        found.data &&
        typeof found.data === 'object' &&
        !Array.isArray(found.data)
          ? (found.data as Record<string, unknown>)
          : {};

      await prisma.pageContentBlock.update({
        where: { id: found.id },
        data: {
          label: config.label,
          // 새로 추가된 정적 필드는 기본값으로 보강하되,
          // 운영자가 이미 수정한 DB 값은 절대 덮어쓰지 않습니다.
          data: {
            ...config.defaults,
            ...existingData,
          } as Prisma.InputJsonValue,
        },
      });

      continue;
    }

    await prisma.pageContentBlock.create({
      data: {
        pageKey: 'page-copy',
        sectionKey: path,
        label: config.label,
        data: config.defaults as Prisma.InputJsonValue,
        version: 1,
      },
    });

    created += 1;
  }

  console.log(
    `PAGE_COPY_SEED_OK — created=${created}, existing=${existing}, total=${paths.length}`,
  );
}

main()
  .catch((error) => {
    console.error('PAGE_COPY_SEED_FAILED', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
