import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const maxImageSize = 5 * 1024 * 1024;

// Demo credentials are never valid for a production deployment.
const testSiteKeys = new Set([
  '1x00000000000000000000AA',
  '2x00000000000000000000AB',
  '3x00000000000000000000FF',
]);
const testSecretKeys = new Set([
  '1x0000000000000000000000000000000AA',
  '2x0000000000000000000000000000000AA',
  '3x0000000000000000000000000000000AA',
]);

type SiteverifyResult = {
  success?: boolean;
  hostname?: string;
  'error-codes'?: string[];
};

export async function POST(request: Request) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!secretKey || !siteKey || (process.env.NODE_ENV === 'production' &&
    (testSecretKeys.has(secretKey) || testSiteKeys.has(siteKey)))) {
    return NextResponse.json(
      { success: false, saved: false, message: '자동입력방지 서비스가 설정되지 않았습니다.' },
      { status: 503 },
    );
  }

  // Reject unreasonably large requests even if a client ignores accept/size rules.
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 6 * 1024 * 1024) {
    return NextResponse.json(
      { success: false, saved: false, message: '첨부파일은 5MB 이하여야 합니다.' },
      { status: 413 },
    );
  }

  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, saved: false, message: '올바르지 않은 요청입니다.' },
      { status: 400 },
    );
  }

  const attachment = body.get('attachment');
  if (attachment instanceof File && attachment.size > maxImageSize) {
    return NextResponse.json(
      { success: false, saved: false, message: '첨부파일은 5MB 이하여야 합니다.' },
      { status: 413 },
    );
  }

  const token = body.get('cf-turnstile-response');
  if (typeof token !== 'string' || !token || token.length > 2048) {
    return NextResponse.json(
      { success: false, saved: false, message: '자동입력방지 확인을 완료해 주세요.' },
      { status: 400 },
    );
  }

  let verified: SiteverifyResult;
  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: token }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Turnstile siteverify service unavailable');
    verified = (await response.json()) as SiteverifyResult;
  } catch {
    return NextResponse.json(
      { success: false, saved: false, message: '자동입력방지를 확인하지 못했습니다. 다시 시도해 주세요.' },
      { status: 502 },
    );
  }

  if (!verified.success) {
    return NextResponse.json(
      { success: false, saved: false, message: '자동입력방지 인증에 실패했습니다. 다시 확인해 주세요.' },
      { status: 400 },
    );
  }

  const allowedHosts = process.env.TURNSTILE_ALLOWED_HOSTNAMES
    ?.split(',')
    .map((host) => host.trim())
    .filter(Boolean);
  if (allowedHosts?.length && (!verified.hostname || !allowedHosts.includes(verified.hostname))) {
    return NextResponse.json(
      { success: false, saved: false, message: '허용되지 않은 도메인의 인증 요청입니다.' },
      { status: 403 },
    );
  }

  // TODO: Once a consultation database is implemented, validate all fields,
  // authenticate access to private consultations, safely upload attachments,
  // and INSERT THE RECORD HERE after successful Siteverify validation.
  // Never split CAPTCHA validation and the actual write into different endpoints.
  // At present, no personal information or attachment is persisted.
  return NextResponse.json({
    success: true,
    saved: false,
    message: '자동입력방지 검증은 통과했습니다. 상담 등록/DB 저장 기능은 아직 연결되지 않아 접수되지 않았습니다.',
  });
}
