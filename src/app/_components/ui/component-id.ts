import { useId } from 'react';

function normalizeReactId(value: string) {
  const normalized = value.replace(/[^A-Za-z0-9_-]/g, '');
  return normalized || 'component';
}

export function useComponentId(prefix: string, explicitId?: string) {
  const reactId = useId();
  const requestedId = explicitId?.trim();

  if (requestedId) {
    return requestedId;
  }

  return `${prefix}-${normalizeReactId(reactId)}`;
}
