'use client';

import type { NavigationItem } from '@/_lib/navigation';
import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';

const NavigationContext = createContext<NavigationItem[]>([]);

export function NavigationProvider({
  navigation,
  children,
}: {
  navigation: NavigationItem[];
  children: ReactNode;
}) {
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
}

export function usePrimaryNavigation() {
  return useContext(NavigationContext);
}
