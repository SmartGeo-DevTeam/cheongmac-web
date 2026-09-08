import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // generate/build는 DB 접속 없이도 가능해야 하므로 CLI용 URL만 여기서 fallback 합니다.
    // migrate 명령은 실제 DIRECT_URL을 설정한 뒤 실행하세요.
    url:
      process.env.DIRECT_URL ??
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@127.0.0.1:5432/postgres',
  },
});
