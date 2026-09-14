'use client';

import { authClient } from '@/_lib/auth-client';
import { canEditContent } from '@/_lib/roles';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'cheongmac-inline-edit-mode';

type InlineEditContextValue = {
  canEdit: boolean;
  editMode: boolean;
  hydrated: boolean;
  setEditMode: (value: boolean) => void;
  toggleEditMode: () => void;
};

const InlineEditContext = createContext<InlineEditContextValue>({
  canEdit: false,
  editMode: false,
  hydrated: false,
  setEditMode: () => undefined,
  toggleEditMode: () => undefined,
});

export function InlineEditProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = authClient.useSession();
  const [hydrated, setHydrated] = useState(false);
  const [editMode, setEditModeState] = useState(false);

  const canEdit =
    hydrated &&
    session?.user.membershipStatus === 'ACTIVE' &&
    canEditContent(session.user.role);

  useEffect(() => {
    setHydrated(true);

    try {
      setEditModeState(
        window.localStorage.getItem(STORAGE_KEY) === 'on',
      );
    } catch {
      setEditModeState(false);
    }
  }, []);

  useEffect(() => {
    if (hydrated && !canEdit) {
      setEditModeState(false);
    }
  }, [canEdit, hydrated]);

  const setEditMode = (value: boolean) => {
    const next = canEdit ? value : false;
    setEditModeState(next);

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        next ? 'on' : 'off',
      );
    } catch {
      // localStorage 사용이 제한된 환경에서는 현재 탭 상태만 유지합니다.
    }
  };

  const value = useMemo<InlineEditContextValue>(
    () => ({
      canEdit,
      editMode: canEdit && editMode,
      hydrated,
      setEditMode,
      toggleEditMode: () =>
        setEditMode(canEdit ? !editMode : false),
    }),
    [canEdit, editMode, hydrated],
  );

  return (
    <InlineEditContext.Provider value={value}>
      {children}
    </InlineEditContext.Provider>
  );
}

export function useInlineEditMode() {
  return useContext(InlineEditContext);
}
