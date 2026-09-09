import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import {
  isActivityEventType,
  sanitizeActivityId,
  sanitizeActivityMetadata,
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
  const pageViewId = sanitizeActivityId(body?.pageViewId);
  const eventType = body?.eventType;
  const path = sanitizeActivityPath(body?.path);
  const targetId =
    typeof body?.targetId === 'string'
      ? body.targetId.trim().slice(0, 120) || null
      : null;
  const metadata = sanitizeActivityMetadata(body?.metadata);

  if (!activitySessionId || !isActivityEventType(eventType) || !path) {
    return Response.json({ ok: false, error: 'INVALID_INPUT' }, { status: 400 });
  }

  const activitySession = await prisma.userActivitySession.findFirst({
    where: {
      id: activitySessionId,
      userId: session.user.id,
    },
    select: { id: true },
  });

  if (!activitySession) {
    return Response.json({ ok: false }, { status: 404 });
  }

  if (pageViewId) {
    const pageView = await prisma.userPageView.findFirst({
      where: {
        id: pageViewId,
        userId: session.user.id,
        activitySessionId,
      },
      select: { id: true },
    });

    if (!pageView) {
      return Response.json({ ok: false }, { status: 404 });
    }
  }

  const now = new Date();

  await prisma.$transaction([
    prisma.userActivityEvent.create({
      data: {
        userId: session.user.id,
        activitySessionId,
        pageViewId,
        eventType,
        path,
        targetId,
        metadata,
        createdAt: now,
      },
    }),
    prisma.userActivitySession.update({
      where: { id: activitySessionId },
      data: { lastActiveAt: now },
    }),
  ]);

  return Response.json({ ok: true });
}
