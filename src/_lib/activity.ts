import {
  ACTIVITY_EVENT_TYPES,
  type ActivityEventType,
} from '@/_lib/activity-types';

const INTERNAL_SKIP_PREFIXES = ['/admin', '/api', '/auth', '/signin', '/join'];

export function isTrackablePath(path: string) {
  return (
    path.startsWith('/') &&
    !INTERNAL_SKIP_PREFIXES.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`),
    )
  );
}

export function sanitizeActivityPath(value: unknown) {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed.startsWith('/') || trimmed.length > 500) return null;

  const path = trimmed.split('?')[0]?.split('#')[0] ?? '/';
  return isTrackablePath(path) ? path : null;
}

export function sanitizeActivityId(value: unknown) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();

  if (!/^[A-Za-z0-9_-]{8,100}$/.test(trimmed)) return null;
  return trimmed;
}

export function getDeviceType(userAgent: string | null) {
  if (!userAgent) return null;

  if (/ipad|tablet|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|ipod|android/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

export function isActivityEventType(value: unknown): value is ActivityEventType {
  return (
    typeof value === 'string' &&
    ACTIVITY_EVENT_TYPES.includes(value as ActivityEventType)
  );
}

type SafeMetadataValue = string | number | boolean | null;

export function sanitizeActivityMetadata(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  const result: Record<string, SafeMetadataValue> = {};

  for (const [key, rawValue] of Object.entries(value).slice(0, 10)) {
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(key)) continue;

    if (typeof rawValue === 'string') {
      result[key] = rawValue.slice(0, 200);
      continue;
    }

    if (
      typeof rawValue === 'number' ||
      typeof rawValue === 'boolean' ||
      rawValue === null
    ) {
      result[key] = rawValue;
    }
  }

  return Object.keys(result).length ? result : undefined;
}

export function sanitizePageTitle(value: unknown) {
  if (typeof value !== 'string') return null;
  const title = value.trim().slice(0, 180);
  return title || null;
}
