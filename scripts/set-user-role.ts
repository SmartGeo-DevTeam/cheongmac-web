import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const allowedRoles = ['MEMBER', 'EDITOR', 'ADMIN', 'SUPER_ADMIN'] as const;

type AllowedRole = (typeof allowedRoles)[number];

async function main() {
  const [, , emailArg, roleArg] = process.argv;
  const role = roleArg?.toUpperCase();

  if (!emailArg || !role || !allowedRoles.includes(role as AllowedRole)) {
    console.error('사용법: npm run auth:set-role -- user@example.com ADMIN');
    console.error(`권한: ${allowedRoles.join(', ')}`);
    process.exitCode = 1;
    return;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('DATABASE_URL이 설정되어 있지 않습니다.');
    process.exitCode = 1;
    return;
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  try {
    const user = await prisma.user.update({
      where: { email: emailArg },
      data: { role: role as AllowedRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        membershipStatus: true,
      },
    });

    console.log('권한 변경 완료:', user);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('권한 변경 중 오류가 발생했습니다.');
  console.error(error);
  process.exitCode = 1;
});
