'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type ScrollDirection = 'up' | 'down' | 'none';

type ScrollDirectionContextValue = {
  scrollY: number;
  direction: ScrollDirection;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  isVisible: boolean;
};

type ScrollDirectionProviderProps = {
  children: ReactNode;
  threshold?: number;
  topOffset?: number;
};

const ScrollDirectionContext =
  createContext<ScrollDirectionContextValue | null>(null);

export function ScrollDirectionProvider({
  children,
  threshold = 8,
  topOffset = 72,
}: ScrollDirectionProviderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<ScrollDirection>('none');
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollYRef = useRef(0);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialScrollY = Math.max(window.scrollY, 0);

    lastScrollYRef.current = initialScrollY;
    setScrollY(initialScrollY);

    const handleScroll = () => {
      if (frameIdRef.current !== null) return;

      frameIdRef.current = window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        const diff = currentScrollY - lastScrollYRef.current;

        setScrollY(currentScrollY);

        if (currentScrollY <= topOffset) {
          setDirection('none');
          setIsVisible(true);
          lastScrollYRef.current = currentScrollY;
          frameIdRef.current = null;
          return;
        }

        if (Math.abs(diff) >= threshold) {
          const nextDirection: ScrollDirection = diff > 0 ? 'down' : 'up';

          setDirection(nextDirection);
          setIsVisible(nextDirection === 'up');

          lastScrollYRef.current = currentScrollY;
        }

        frameIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };
  }, [threshold, topOffset]);

  const value = useMemo<ScrollDirectionContextValue>(
    () => ({
      scrollY,
      direction,
      isScrollingUp: direction === 'up',
      isScrollingDown: direction === 'down',
      isVisible,
    }),
    [direction, isVisible, scrollY],
  );

  return (
    <ScrollDirectionContext.Provider value={value}>
      {children}
    </ScrollDirectionContext.Provider>
  );
}

export function useScrollDirection() {
  const context = useContext(ScrollDirectionContext);

  if (!context) {
    throw new Error(
      'useScrollDirection must be used within ScrollDirectionProvider.',
    );
  }

  return context;
}
