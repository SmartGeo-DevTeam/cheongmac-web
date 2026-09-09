'use client';

import type { ActivityEventType } from '@/_lib/activity-types';

export const ACTIVITY_CUSTOM_EVENT = 'cheongmac:activity-event';

export function trackActivityEvent(
  eventType: ActivityEventType,
  metadata?: Record<string, string | number | boolean | null>,
  targetId?: string,
) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent(ACTIVITY_CUSTOM_EVENT, {
      detail: {
        eventType,
        metadata,
        targetId,
      },
    }),
  );
}
