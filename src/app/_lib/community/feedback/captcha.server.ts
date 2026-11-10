import { createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto';

const CAPTCHA_TTL_MS = 5 * 60 * 1000;

function getSecret() {
  const secret = process.env.FEEDBACK_CAPTCHA_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function sign(answer: string, expiresAt: number, nonce: string, secret: string) {
  return createHmac('sha256', secret)
    .update(`${answer}.${expiresAt}.${nonce}`)
    .digest('hex');
}

export function createFeedbackCaptcha() {
  const secret = getSecret();
  if (!secret) return null;

  const challenge = Array.from({ length: 5 }, () => randomInt(0, 10)).join('');
  const expiresAt = Date.now() + CAPTCHA_TTL_MS;
  const nonce = randomBytes(16).toString('hex');
  const signature = sign(challenge, expiresAt, nonce, secret);
  return { challenge, token: `${expiresAt}.${nonce}.${signature}` };
}

export function verifyFeedbackCaptcha(answer: string, token: string) {
  const secret = getSecret();
  if (!secret || !/^\d{5}$/.test(answer)) return false;

  const match = /^(\d{13})\.([a-f0-9]{32})\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;

  const expiresAt = Number(match[1]);
  if (expiresAt < Date.now() || expiresAt > Date.now() + CAPTCHA_TTL_MS) {
    return false;
  }

  const expected = Buffer.from(sign(answer, expiresAt, match[2], secret), 'hex');
  const actual = Buffer.from(match[3], 'hex');
  return timingSafeEqual(expected, actual);
}

export function isFeedbackCaptchaConfigured() {
  return getSecret() !== null;
}
