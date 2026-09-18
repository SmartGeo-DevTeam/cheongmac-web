import fs from 'node:fs';

function read(file) {
  if (!fs.existsSync(file)) {
    console.error(
      `❌ MEMBERSHIP_SESSION_GUARD_CHECK 파일 누락: ${file}`,
    );
    process.exit(1);
  }

  return fs.readFileSync(file, 'utf8');
}

function requireToken(file, token) {
  if (!read(file).includes(token)) {
    console.error(
      `❌ MEMBERSHIP_SESSION_GUARD_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

for (const token of [
  "session?.user.membershipStatus === 'ACTIVE'",
  'Boolean(session.user.onboardingCompletedAt)',
]) {
  requireToken('src/_lib/auth-session.ts', token);
}

for (const token of [
  "export async function proxy(request: NextRequest)",
  "getSessionCookie(request)",
  "disableCookieCache: true",
  "'/join'",
  "'/auth/complete'",
  "'/signout'",
  "'/terms'",
  "'/privacy-policy'",
  "reason', 'membership_incomplete'",
  "matcher: ['/((?!api|_next|.*\\\\..*).*)']",
]) {
  requireToken('src/proxy.ts', token);
}

for (const token of [
  '/signout?callbackURL=',
  'reason=membership_incomplete',
  'encodeURIComponent(callbackURL)',
]) {
  requireToken('src/app/signin/page.tsx', token);
}

for (const token of [
  "authClient.signOut()",
  "window.location.replace(callbackURL)",
  "membership_incomplete",
  "다시 로그아웃",
]) {
  requireToken('src/app/signout/signout-client.tsx', token);
}

for (const token of [
  "safeCallbackPath",
  "rawCallbackURL === '/signout'",
  '<SignOutClient',
]) {
  requireToken('src/app/signout/page.tsx', token);
}

for (const token of [
  'if (!isActive) {',
  'return null;',
]) {
  requireToken('src/app/_components/account-dock.tsx', token);
}

// OAuth 성공 후 PENDING 사용자는 /join으로 이동해야 하며,
// 일반 /signin으로 재진입한 PENDING 세션만 강제 종료합니다.
requireToken(
  'src/app/auth/complete/page.tsx',
  'redirect(`/join?callbackURL=',
);
requireToken(
  'src/app/join/actions.ts',
  "membershipStatus: 'ACTIVE'",
);
requireToken(
  'src/app/join/actions.ts',
  'onboardingCompletedAt: completedAt',
);

console.log(
  'MEMBERSHIP_SESSION_GUARD_CHECK_OK — PENDING 임시 세션은 회원전환 흐름에서만 허용 / 이탈 시 강제 로그아웃 / ACTIVE+onboarding 완료 후에만 회원 로그인 인정 / /signout 강제 로그아웃 route 확인',
);
