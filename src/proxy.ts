import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n-config';

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') ?? '';

  const headers = {
    'accept-language': acceptLanguage,
  };

  const languages = new Negotiator({ headers }).languages();

  return match(languages, i18n.locales, i18n.defaultLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // 내부 리소스와 정적 파일 제외
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
