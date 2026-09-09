import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import {
  getDeviceType,
  sanitizeActivityId,
  sanitizeActivityPath,
} from '@/_lib/activity';
import { prisma } from '@/_lib/prisma';

export async function POST(request: Request) {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session)) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const activitySessionId = sanitizeActivityId(body?.activitySessionId);
  const entryPath = sanitizeActivityPath(body?.entryPath);

  if (!activitySessionId || !entryPath) {
    return Response.json({ ok: false, error: 'INVALID_INPUT' }, { status: 400 });
  }

  const userAgent = request.headers.get('user-agent')?.slice(0, 1000) ?? null;
  const deviceType = getDeviceType(userAgent);
  const authSessionId = session.session.id;
  const now = new Date();

  const [account, existingActivitySession] = await Promise.all([
    prisma.account.findFirst({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      select: { providerId: true },
    }),
    prisma.userActivitySession.findUnique({
      where: { id: activitySessionId },
      select: { userId: true },
    }),
  ]);

  if (
    existingActivitySession &&
    existingActivitySession.userId !== session.user.id
  ) {
    return Response.json({ ok: false }, { status: 403 });
  }

  const loginTime = new Date(session.session.createdAt);

  await prisma.$transaction([
    prisma.userLoginLog.upsert({
      where: { authSessionId },
      update: {},
      create: {
        userId: session.user.id,
        authSessionId,
        provider: account?.providerId ?? null,
        deviceType,
        userAgent,
        loggedInAt: Number.isNaN(loginTime.getTime()) ? now : loginTime,
      },
    }),
    existingActivitySession
      ? prisma.userActivitySession.update({
          where: { id: activitySessionId },
          data: {
            authSessionId,
            lastActiveAt: now,
            endedAt: null,
            deviceType,
            userAgent,
          },
        })
      : prisma.userActivitySession.create({
          data: {
            id: activitySessionId,
            userId: session.user.id,
            authSessionId,
            entryPath,
            deviceType,
            userAgent,
            startedAt: now,
            lastActiveAt: now,
          },
        }),
  ]);

  return Response.json({ ok: true });
}
