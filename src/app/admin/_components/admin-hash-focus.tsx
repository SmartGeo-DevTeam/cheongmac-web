'use client';

import { Crosshair } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const FOCUS_CLASSES = [
  'outline',
  'outline-2',
  'outline-offset-4',
  'outline-[#FD7740]',
  'ring-4',
  'ring-[#FD7740]/15',
  'rounded-lg',
] as const;

function openParentDetails(element: HTMLElement) {
  let current: HTMLElement | null = element;

  while (current) {
    if (current instanceof HTMLDetailsElement) {
      current.open = true;
    }
    current = current.parentElement;
  }
}

export default function AdminHashFocus() {
  const pathname = usePathname();
  const [message, setMessage] = useState('');
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;

    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    if (!hash) {
      setMessage('');
      return;
    }

    let cancelled = false;
    let attempt = 0;
    let timer: number | undefined;

    const tryFocus = () => {
      if (cancelled) return;

      const target = document.getElementById(hash);
      if (!target) {
        attempt += 1;

        if (attempt <= 20) {
          timer = window.setTimeout(tryFocus, 120);
          return;
        }

        setMessage('수정 위치를 찾지 못했습니다.');
        timer = window.setTimeout(() => setMessage(''), 3000);
        return;
      }

      openParentDetails(target);
      target.classList.add(...FOCUS_CLASSES);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });

      const hadTabIndex = target.hasAttribute('tabindex');
      const previousTabIndex = target.getAttribute('tabindex');

      if (!hadTabIndex && !target.matches('input, textarea, select, button, a[href]')) {
        target.setAttribute('tabindex', '-1');
      }

      window.setTimeout(() => {
        target.focus({ preventScroll: true });
      }, 280);

      setMessage('수정할 위치를 표시했습니다.');

      const clearHighlight = window.setTimeout(() => {
        target.classList.remove(...FOCUS_CLASSES);
        setMessage('');

        if (!hadTabIndex) {
          target.removeAttribute('tabindex');
        } else if (previousTabIndex !== null) {
          target.setAttribute('tabindex', previousTabIndex);
        }
      }, 6500);

      cleanupRef.current = () => {
        window.clearTimeout(clearHighlight);
        target.classList.remove(...FOCUS_CLASSES);

        if (!hadTabIndex) {
          target.removeAttribute('tabindex');
        } else if (previousTabIndex !== null) {
          target.setAttribute('tabindex', previousTabIndex);
        }
      };
    };

    timer = window.setTimeout(tryFocus, 80);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [pathname]);

  if (!message) return null;

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-[300] flex items-center gap-2 rounded-full border border-[#FFD2BD] bg-white px-4 py-2.5 text-sm font-semibold text-[#D95723] shadow-[0_10px_35px_rgba(0,0,0,0.14)]">
      <Crosshair className="size-4" />
      {message}
    </div>
  );
}
