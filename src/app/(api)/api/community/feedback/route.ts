import { NextResponse } from 'next/server';
import {
  isFeedbackCaptchaConfigured,
  verifyFeedbackCaptcha,
} from '@/app/_lib/community/feedback/captcha.server';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

function stringField(body: FormData, key: string, max: number) {
  const value = body.get(key);
  return typeof value === 'string' ? value.trim().slice(0, max + 1) : '';
}

function error(message: string, status = 400) {
  return NextResponse.json({ success: false, saved: false, message }, { status });
}

export async function POST(request: Request) {
  if (!isFeedbackCaptchaConfigured()) {
    return error('자동입력방지 서비스가 설정되지 않았습니다.', 503);
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 6 * 1024 * 1024) {
    return error('첨부파일은 5MB 이하여야 합니다.', 413);
  }

  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return error('올바르지 않은 요청입니다.');
  }

  const category = stringField(body, 'category', 30);
  const title = stringField(body, 'title', 120);
  const content = stringField(body, 'content', 2000);
  const name = stringField(body, 'name', 80);
  const phonePrefix = stringField(body, 'phonePrefix', 3);
  const phoneMiddle = stringField(body, 'phoneMiddle', 4);
  const phoneLast = stringField(body, 'phoneLast', 4);
  const captchaAnswer = stringField(body, 'captchaAnswer', 5);
  const captchaToken = stringField(body, 'captchaToken', 200);

  if (!['praise', 'suggestion', 'complaint'].includes(category)) {
    return error('분류를 선택해 주세요.');
  }
  if (!title || title.length > 120 || !content || content.length > 2000 || !name || name.length > 80) {
    return error('필수 입력 항목을 확인해 주세요.');
  }
  if (!['010', '011', '016'].includes(phonePrefix) || !/^\d{3,4}$/.test(phoneMiddle) || !/^\d{4}$/.test(phoneLast)) {
    return error('연락처를 확인해 주세요.');
  }

  const attachment = body.get('attachment');
  if (attachment instanceof File && attachment.size > 0) {
    if (attachment.size > MAX_FILE_SIZE || !ALLOWED_IMAGES.has(attachment.type)) {
      return error('5MB 이하의 PNG, JPG, WEBP 또는 GIF 파일만 첨부할 수 있습니다.');
    }
  }

  if (!verifyFeedbackCaptcha(captchaAnswer, captchaToken)) {
    return error('자동입력방지 숫자가 틀렸거나 만료되었습니다. 다시 입력해 주세요.');
  }

  // TODO: DB와 비공개 파일 저장소가 준비되면 검증 후 저장 및 접수번호 발급.
  // 현재는 접수/저장을 수행하지 않습니다. 이 메시지를 접수 완료로 바꾸면 안 됩니다.
  return NextResponse.json({
    success: true,
    saved: false,
    message: '입력값 검증이 완료되었습니다. 현재는 접수 DB가 연결되지 않아 글과 첨부파일이 저장되거나 접수되지는 않습니다.',
  });
}
