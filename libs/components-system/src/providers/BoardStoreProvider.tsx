import { createContext, type ReactNode, useRef } from 'react';
import { type StoreApi } from 'zustand';

import { type BoardStore, createBoardStore } from '../store/board.store';
import type { Containers } from '../types/board.d';

export const BoardStoreContext = createContext<StoreApi<BoardStore> | null>(
  null
);

export interface BoardStoreProviderProps {
  initialState: Containers;
  children: ReactNode;
}

export const BoardStoreProvider = ({
  initialState,
  children,
}: BoardStoreProviderProps) => {
  const storeRef = useRef<StoreApi<BoardStore>>();

  if (!storeRef.current) {
    storeRef.current = createBoardStore(initialState);
  }

  return (
    <BoardStoreContext.Provider value={storeRef.current}>
      {children}
    </BoardStoreContext.Provider>
  );
};
