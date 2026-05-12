'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { HomeSectionProps } from '../[lang]/_components/home/types';

type HomeContextValue = HomeSectionProps;

const HomeContext = createContext<HomeContextValue | null>(null);

export function HomeProvider({
  lang,
  home,
  children,
}: HomeSectionProps & {
  children: ReactNode;
}) {
  const value = useMemo<HomeContextValue>(
    () => ({
      lang,
      home,
    }),
    [lang, home],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHome() {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHome must be used within HomeProvider.');
  }

  return context;
}
