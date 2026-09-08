# 청맥병원 로그인 / 회원 / 권한 설정

## 구성
- Better Auth 1.7.3
- Google / Naver / Kakao OAuth
- Supabase PostgreSQL
- Prisma 7.10.0
- 역할: MEMBER / EDITOR / ADMIN / SUPER_ADMIN
- 회원 상태: PENDING / ACTIVE

Prisma 8이 현재 최신 메이저지만, Better Auth 공식 Prisma adapter 가이드는 Prisma 7 + PostgreSQL 조합을 기준으로 안내하고 있어 이 패치에서는 7.10.0으로 고정했습니다.

## 1. Supabase
1. Supabase에서 새 프로젝트를 만들고 Region은 Seoul을 선택합니다.
2. Project > Connect에서 PostgreSQL 연결 문자열을 확인합니다.
3. `.env.example`을 `.env`로 복사하고 `DATABASE_URL`, `DIRECT_URL`을 입력합니다.
   - `DATABASE_URL`: 런타임용 Transaction Pooler(일반적으로 6543)
   - `DIRECT_URL`: Prisma CLI/migration용 Direct 또는 Session Pooler(일반적으로 5432)
4. 최초 1회 `npm run db:deploy`로 migration을 적용합니다.

## 2. Better Auth secret
32자 이상의 충분히 긴 랜덤 문자열을 `BETTER_AUTH_SECRET`에 입력합니다.

## 3. OAuth callback URL
로컬 개발 callback:
- Google: `http://localhost:3000/api/auth/callback/google`
- Naver: `http://localhost:3000/api/auth/callback/naver`
- Kakao: `http://localhost:3000/api/auth/callback/kakao`

운영에서는 `http://localhost:3000`을 실제 HTTPS 도메인으로 바꿉니다.

Kakao 이메일은 앱 설정/비즈 앱 조건에 따라 제공 범위가 달라질 수 있으므로 운영 앱에서 이메일 동의 항목을 확인해야 합니다.

## 4. 최초 회원 전환
OAuth 성공 시 사용자는 `PENDING` 상태로 생성됩니다. `/join`에서 본명/연락처/필수 약관을 확인하면 `ACTIVE`가 됩니다. 이메일은 소셜 계정에서 받은 값을 표시하며 임의 수정하지 않습니다.

## 5. 첫 관리자 지정
관리자로 만들 계정이 소셜 로그인 + 회원 전환까지 완료된 뒤 실행합니다.

```bash
npm run auth:set-role -- admin@example.com SUPER_ADMIN
```

콘텐츠 담당자는:

```bash
npm run auth:set-role -- editor@example.com EDITOR
```

## 6. 콘텐츠 수정 이력
`/admin/content`에서 콘텐츠를 생성/수정하면 `content_revision`과 `admin_audit_log`에 이력이 함께 저장됩니다. 현재 패치는 CMS 기반과 권한을 먼저 연결한 단계이며, 기존 하드코딩 문구를 콘텐츠 키로 치환하는 작업은 페이지별로 순차 적용할 수 있습니다.

## 7. 치료사례
기존 임시 상수 기반 로그인 잠금은 실제 Better Auth 세션 + `ACTIVE` 회원 여부로 교체됩니다.
