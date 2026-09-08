import { prisma } from '@/_lib/prisma';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { betterAuth } from 'better-auth';

const socialProviders = {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          prompt: 'select_account' as const,
        },
      }
    : {}),
  ...(process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET
    ? {
        naver: {
          clientId: process.env.NAVER_CLIENT_ID,
          clientSecret: process.env.NAVER_CLIENT_SECRET,
        },
      }
    : {}),
  ...(process.env.KAKAO_CLIENT_ID && process.env.KAKAO_CLIENT_SECRET
    ? {
        kakao: {
          clientId: process.env.KAKAO_CLIENT_ID,
          clientSecret: process.env.KAKAO_CLIENT_SECRET,
        },
      }
    : {}),
};

export const auth = betterAuth({
  appName: '청맥병원',
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: false,
  },
  account: {
    accountLinking: {
      // 같은 이메일만으로 서로 다른 소셜 계정을 자동 병합하지 않습니다.
      disableImplicitLinking: true,
    },
  },
  user: {
    additionalFields: {
      phone: {
        type: 'string',
        required: false,
      },
      role: {
        type: 'string',
        required: false,
        defaultValue: 'MEMBER',
        input: false,
      },
      membershipStatus: {
        type: 'string',
        required: false,
        defaultValue: 'PENDING',
        input: false,
      },
      onboardingCompletedAt: {
        type: 'date',
        required: false,
        input: false,
      },
    },
  },
  socialProviders,
  advanced: {
    database: {
      joins: true,
    },
  },
});

export type AuthSession = typeof auth.$Infer.Session;
