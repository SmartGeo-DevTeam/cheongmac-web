'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';

type TurnstileWidgetOptions = {
  sitekey: string;
  size: 'flexible';
  theme: 'light';
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileWidgetOptions) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function TurnstileCaptcha({
  siteKey,
  onTokenChange,
}: {
  siteKey: string;
  onTokenChange: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const callbackRef = useRef(onTokenChange);

  useEffect(() => {
    callbackRef.current = onTokenChange;
  }, [onTokenChange]);

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !containerRef.current || widgetRef.current !== null) {
      return;
    }

    widgetRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      size: 'flexible',
      theme: 'light',
      callback: (token) => callbackRef.current(token),
      'expired-callback': () => callbackRef.current(''),
      'error-callback': () => callbackRef.current(''),
    });
  }, [siteKey]);

  useEffect(() => {
    // Supports client-side navigation when Turnstile script has already loaded.
    renderWidget();
    return () => {
      if (widgetRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetRef.current);
        widgetRef.current = null;
      }
    };
  }, [renderWidget]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} className="min-h-16 w-full max-w-[440px]" />
    </>
  );
}
