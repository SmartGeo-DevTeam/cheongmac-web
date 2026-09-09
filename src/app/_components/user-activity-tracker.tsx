'use client';

import { authClient } from '@/_lib/auth-client';
import { ACTIVITY_CUSTOM_EVENT } from '@/_lib/activity-client';
import { isTrackablePath } from '@/_lib/activity';
import type { ActivityEventType } from '@/_lib/activity-types';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

type ActivePage = {
  id: string;
  path: string;
};

type ActivityEventDetail = {
  eventType: ActivityEventType;
  metadata?: Record<string, string | number | boolean | null>;
  targetId?: string;
};

const HEARTBEAT_MS = 15_000;

function randomId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replaceAll('-', '');
  }

  return `${Date.now()}_${Math.random().toString(36).slice(2, 14)}`;
}

function activitySessionIdFor(userId: string) {
  const key = `cheongmac:activity-session:${userId}`;
  const existing = window.sessionStorage.getItem(key);

  if (existing) return existing;

  const next = randomId();
  window.sessionStorage.setItem(key, next);
  return next;
}

function sameOriginReferrerPath() {
  if (!document.referrer) return null;

  try {
    const url = new URL(document.referrer);
    return url.origin === window.location.origin ? url.pathname : null;
  } catch {
    return null;
  }
}

function postJson(
  url: string,
  payload: Record<string, unknown>,
  beacon = false,
) {
  const body = JSON.stringify(payload);

  if (beacon && navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(url, blob);
    return;
  }

  void fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    keepalive: beacon,
    body,
  }).catch(() => undefined);
}

export default function UserActivityTracker() {
  const pathname = usePathname();
  const { data: session, refetch } = authClient.useSession();
  const activitySessionIdRef = useRef<string | null>(null);
  const pageRef = useRef<ActivePage | null>(null);
  const lastVisibleAtRef = useRef<number | null>(null);
  const initializedUserIdRef = useRef<string | null>(null);
  const sequenceRef = useRef(0);

  const activeUserId =
    session?.user.membershipStatus === 'ACTIVE' ? session.user.id : null;

  useEffect(() => {
    if (!session) return;
    void refetch();
  }, [pathname, refetch, session?.user.id]);

  const flushEngagement = useCallback((beacon = false) => {
    const page = pageRef.current;
    const activitySessionId = activitySessionIdRef.current;
    const startedAt = lastVisibleAtRef.current;

    if (!page || !activitySessionId || startedAt === null) return;

    const now = Date.now();
    const seconds = Math.min(
      30,
      Math.max(0, Math.floor((now - startedAt) / 1000)),
    );

    lastVisibleAtRef.current =
      document.visibilityState === 'visible' ? now : null;

    if (seconds <= 0) return;

    postJson(
      '/api/activity/page-view',
      {
        action: 'HEARTBEAT',
        activitySessionId,
        pageViewId: page.id,
        seconds,
      },
      beacon,
    );
  }, []);

  const endPage = useCallback(
    (
      page: ActivePage,
      nextPath: string | null,
      endSession: boolean,
      beacon = false,
    ) => {
      const activitySessionId = activitySessionIdRef.current;
      if (!activitySessionId) return;

      postJson(
        '/api/activity/page-view',
        {
          action: 'END',
          activitySessionId,
          pageViewId: page.id,
          path: page.path,
          nextPath,
          endSession,
        },
        beacon,
      );
    },
    [],
  );

  const sendEvent = useCallback(
    (detail: ActivityEventDetail) => {
      const page = pageRef.current;
      const activitySessionId = activitySessionIdRef.current;

      if (!page || !activitySessionId) return;

      postJson('/api/activity/event', {
        activitySessionId,
        pageViewId: page.id,
        eventType: detail.eventType,
        path: page.path,
        targetId: detail.targetId,
        metadata: detail.metadata,
      });
    },
    [],
  );

  useEffect(() => {
    if (!activeUserId || !isTrackablePath(pathname)) {
      const previous = pageRef.current;

      if (previous) {
        flushEngagement();
        endPage(previous, isTrackablePath(pathname) ? pathname : null, false);
        pageRef.current = null;
        lastVisibleAtRef.current = null;
      }

      return;
    }

    const sequence = ++sequenceRef.current;
    const activitySessionId = activitySessionIdFor(activeUserId);
    activitySessionIdRef.current = activitySessionId;

    const previous = pageRef.current;

    if (previous?.path === pathname) return;

    if (previous) {
      flushEngagement();
      endPage(previous, pathname, false);
      pageRef.current = null;
    }

    const pageViewId = randomId();

    const start = async () => {
      if (initializedUserIdRef.current !== activeUserId) {
        const initResponse = await fetch('/api/activity/session', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({
            activitySessionId,
            entryPath: pathname,
          }),
        }).catch(() => null);

        if (!initResponse?.ok || sequence !== sequenceRef.current) return;
        initializedUserIdRef.current = activeUserId;
      }

      if (sequence !== sequenceRef.current) return;

      pageRef.current = { id: pageViewId, path: pathname };
      lastVisibleAtRef.current =
        document.visibilityState === 'visible' ? Date.now() : null;

      postJson('/api/activity/page-view', {
        action: 'START',
        activitySessionId,
        pageViewId,
        path: pathname,
        pageTitle: document.title,
        referrerPath: previous?.path ?? sameOriginReferrerPath(),
      });
    };

    void start();
  }, [activeUserId, endPage, flushEngagement, pathname]);

  useEffect(() => {
    if (!activeUserId) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        flushEngagement();
      }
    }, HEARTBEAT_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushEngagement(true);
      } else if (pageRef.current) {
        lastVisibleAtRef.current = Date.now();
      }
    };

    const onPageHide = () => {
      const page = pageRef.current;
      if (!page) return;

      flushEngagement(true);
      endPage(page, null, true, true);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;

      try {
        const url = new URL(anchor.href, window.location.href);

        if (url.origin === window.location.origin) {
          if (!isTrackablePath(url.pathname)) return;

          sendEvent({
            eventType: 'NAVIGATION_CLICK',
            metadata: { targetPath: url.pathname },
          });
          return;
        }

        sendEvent({
          eventType: 'EXTERNAL_LINK_CLICK',
          metadata: { targetHost: url.hostname },
        });
      } catch {
        return;
      }
    };

    const onCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent<ActivityEventDetail>;
      if (!customEvent.detail?.eventType) return;
      sendEvent(customEvent.detail);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onPageHide);
    document.addEventListener('click', onClick, true);
    window.addEventListener(ACTIVITY_CUSTOM_EVENT, onCustomEvent);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', onPageHide);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener(ACTIVITY_CUSTOM_EVENT, onCustomEvent);
    };
  }, [activeUserId, endPage, flushEngagement, sendEvent]);

  return null;
}
