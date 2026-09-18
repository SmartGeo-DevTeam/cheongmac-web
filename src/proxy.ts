import { auth } from '@/_lib/auth';
import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const ONBOARDING_ALLOWED_PATHS = new Set([
  '/join',
  '/auth/complete',
  '/signout',
  '/terms',
  '/privacy-policy',
]);

function isActiveMembership(session: Awaited<ReturnType<typeof auth.api.getSession>>) {
  return (
    session?.user.membershipStatus === 'ACTIVE' &&
    Boolean(session.user.onboardingCompletedAt)
  );
}

function isOnboardingAllowedPath(pathname: string) {
  return ONBOARDING_ALLOWED_PATHS.has(pathname);
}

export async function proxy(request: NextRequest) {
  // 비로그인 방문자는 DB 조회 없이 그대로 통과시킵니다.
  if (!getSessionCookie(request)) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
    query: {
      // OAuth 직후 PENDING → ACTIVE 전환이 발생하므로 cookie cache가 아닌
      // DB의 최신 membershipStatus/onboardingCompletedAt을 사용합니다.
      disableCookieCache: true,
    },
  });

  if (!session || isActiveMembership(session)) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  // PENDING 세션은 "회원 로그인"이 아니라 최초 회원 전환을 위한
  // 임시 소셜 인증 세션으로만 사용합니다.
  if (isOnboardingAllowedPath(pathname)) {
    return NextResponse.next();
  }

  const callbackURL = `${pathname}${request.nextUrl.search}`;
  const signoutURL = request.nextUrl.clone();
  signoutURL.pathname = '/signout';
  signoutURL.search = '';
  signoutURL.searchParams.set('callbackURL', callbackURL);
  signoutURL.searchParams.set('reason', 'membership_incomplete');

  return NextResponse.redirect(signoutURL);
}

export const config = {
  // Better Auth API 및 일반 API는 각 route의 서버 권한 검사에 맡기고,
  // 화면 라우팅에서만 PENDING 세션의 이탈을 강제 종료합니다.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
