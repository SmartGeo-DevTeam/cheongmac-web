'use server';

import { getCurrentSession } from '@/_lib/auth-session';
import { safeCallbackPath } from '@/_lib/auth-utils';
import { MEMBERSHIP_CONSENT_VERSIONS } from '@/_lib/membership';
import { prisma } from '@/_lib/prisma';
import { redirect } from 'next/navigation';

export type JoinState = {
  error?: string;
};

function normalizePhone(value: string) {
  return value.replace(/[^0-9]/g, '');
}

export async function completeMembership(
  _previousState: JoinState,
  formData: FormData,
): Promise<JoinState> {
  const session = await getCurrentSession();

  if (!session) {
    return { error: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.' };
  }

  const name = String(formData.get('name') ?? '').trim();
  const phone = normalizePhone(String(formData.get('phone') ?? ''));
  const callbackURL = safeCallbackPath(String(formData.get('callbackURL') ?? '/'));
  const termsAccepted = formData.get('termsAccepted') === 'on';
  const privacyAccepted = formData.get('privacyAccepted') === 'on';

  if (name.length < 2 || name.length > 50) {
    return { error: '본명을 2자 이상 50자 이하로 입력해주세요.' };
  }

  if (!/^01[016789][0-9]{7,8}$/.test(phone)) {
    return { error: '연락처를 휴대폰 번호 형식으로 입력해주세요.' };
  }

  if (!termsAccepted || !privacyAccepted) {
    return { error: '필수 약관과 개인정보 수집·이용에 동의해주세요.' };
  }

  const completedAt = new Date();

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone,
        membershipStatus: 'ACTIVE',
        onboardingCompletedAt: completedAt,
      },
    });

    await tx.consent.upsert({
      where: {
        userId_type_version: {
          userId: session.user.id,
          type: 'TERMS',
          version: MEMBERSHIP_CONSENT_VERSIONS.TERMS,
        },
      },
      create: {
        userId: session.user.id,
        type: 'TERMS',
        version: MEMBERSHIP_CONSENT_VERSIONS.TERMS,
        acceptedAt: completedAt,
      },
      update: { acceptedAt: completedAt },
    });

    await tx.consent.upsert({
      where: {
        userId_type_version: {
          userId: session.user.id,
          type: 'PRIVACY',
          version: MEMBERSHIP_CONSENT_VERSIONS.PRIVACY,
        },
      },
      create: {
        userId: session.user.id,
        type: 'PRIVACY',
        version: MEMBERSHIP_CONSENT_VERSIONS.PRIVACY,
        acceptedAt: completedAt,
      },
      update: { acceptedAt: completedAt },
    });
  });

  redirect(callbackURL);
}
