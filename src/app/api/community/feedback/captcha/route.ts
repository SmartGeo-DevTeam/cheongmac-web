import { NextResponse } from 'next/server';
import { createFeedbackCaptcha } from '../_captcha';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const captcha = createFeedbackCaptcha();
  if (!captcha) {
    return NextResponse.json(
      { message: '자동입력방지 설정(FEEDBACK_CAPTCHA_SECRET)이 필요합니다.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return NextResponse.json(captcha, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
