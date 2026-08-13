'use client';

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';

type HomeContextValue = {
  home?: Record<string, unknown>;
};

type HomeProviderProps = HomeContextValue & {
  children: ReactNode;
};

const HomeContext = createContext<HomeContextValue | null>(null);

/**
 * 다국어 구조 제거 전의 HomeProvider import 호환성을 위한 provider입니다.
 * 현재 홈 섹션은 정적 컴포넌트로 구성되어 있어 lang 값은 더 이상 사용하지 않습니다.
 */
export function HomeProvider({ home, children }: HomeProviderProps) {
  const value = useMemo<HomeContextValue>(() => ({ home }), [home]);

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHome() {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHome must be used within HomeProvider.');
  }

  return context;
}
