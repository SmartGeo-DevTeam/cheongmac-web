import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import {
  sanitizeActivityId,
  sanitizeActivityPath,
  sanitizePageTitle,
} from '@/_lib/activity';
import { prisma } from '@/_lib/prisma';

type Action = 'START' | 'HEARTBEAT' | 'END';

function parseSeconds(value: unknown) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds)) return 0;
  return Math.min(Math.max(Math.floor(seconds), 0), 30);
}

export async function POST(request: Request) {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session)) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const action = body?.action as Action | undefined;
  const activitySessionId = sanitizeActivityId(body?.activitySessionId);
  const pageViewId = sanitizeActivityId(body?.pageViewId);

  if (
    !activitySessionId ||
    !pageViewId ||
    !['START', 'HEARTBEAT', 'END'].includes(action ?? '')
  ) {
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

  const now = new Date();

  if (action === 'START') {
    const path = sanitizeActivityPath(body?.path);
    const referrerPath = sanitizeActivityPath(body?.referrerPath);
    const pageTitle = sanitizePageTitle(body?.pageTitle);

    if (!path) {
      return Response.json({ ok: false, error: 'INVALID_PATH' }, { status: 400 });
    }

    const existing = await prisma.userPageView.findUnique({
      where: { id: pageViewId },
      select: { userId: true },
    });

    if (existing && existing.userId !== session.user.id) {
      return Response.json({ ok: false }, { status: 403 });
    }

    if (!existing) {
      await prisma.$transaction([
        prisma.userPageView.create({
          data: {
            id: pageViewId,
            userId: session.user.id,
            activitySessionId,
            path,
            pageTitle,
            referrerPath,
            enteredAt: now,
          },
        }),
        prisma.userActivitySession.update({
          where: { id: activitySessionId },
          data: {
            pageViewCount: { increment: 1 },
            lastActiveAt: now,
            endedAt: null,
            exitPath: path,
          },
        }),
      ]);
    } else {
      await prisma.userActivitySession.update({
        where: { id: activitySessionId },
        data: { lastActiveAt: now, endedAt: null },
      });
    }

    return Response.json({ ok: true });
  }

  if (action === 'HEARTBEAT') {
    const seconds = parseSeconds(body?.seconds);

    if (seconds <= 0) {
      return Response.json({ ok: true });
    }

    const updated = await prisma.userPageView.updateMany({
      where: {
        id: pageViewId,
        userId: session.user.id,
        activitySessionId,
      },
      data: {
        engagedSeconds: { increment: seconds },
      },
    });

    if (updated.count === 0) {
      return Response.json({ ok: false }, { status: 404 });
    }

    await prisma.userActivitySession.update({
      where: { id: activitySessionId },
      data: {
        engagedSeconds: { increment: seconds },
        lastActiveAt: now,
      },
    });

    return Response.json({ ok: true });
  }

  const path = sanitizeActivityPath(body?.path);
  const nextPath = sanitizeActivityPath(body?.nextPath);
  const endSession = body?.endSession === true;

  await prisma.$transaction([
    prisma.userPageView.updateMany({
      where: {
        id: pageViewId,
        userId: session.user.id,
        activitySessionId,
      },
      data: {
        leftAt: now,
        nextPath,
      },
    }),
    prisma.userActivitySession.update({
      where: { id: activitySessionId },
      data: {
        lastActiveAt: now,
        exitPath: path,
        ...(endSession ? { endedAt: now } : {}),
      },
    }),
  ]);

  return Response.json({ ok: true });
}
