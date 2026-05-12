'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type ViewportContextValue = {
  isMobile: boolean;
  isDesktop: boolean;
};

const ViewportContext = createContext<ViewportContextValue | null>(null);

// Tailwind 기본 xl 기준: 1280px
const XL_QUERY = '(min-width: 1280px)';

export function ViewportProvider({ children }: { children: ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(XL_QUERY);

    const update = () => {
      setIsDesktop(mediaQueryList.matches);
    };

    update();

    mediaQueryList.addEventListener('change', update);

    return () => {
      mediaQueryList.removeEventListener('change', update);
    };
  }, []);

  const value = useMemo<ViewportContextValue>(
    () => ({
      isMobile: !isDesktop,
      isDesktop,
    }),
    [isDesktop],
  );

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  const context = useContext(ViewportContext);

  if (!context) {
    throw new Error('useViewport must be used within ViewportProvider.');
  }

  return context;
}
