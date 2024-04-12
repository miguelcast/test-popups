import { useContext } from 'react';
import { useStore } from 'zustand';

import { type BoardStore } from '../store/board.store';
import { BoardStoreContext } from '../providers/BoardStoreProvider';

export const useBoardStore = <T>(selector: (store: BoardStore) => T): T => {
  const boardStoreContext = useContext(BoardStoreContext);

  if (!boardStoreContext) {
    throw new Error(`useBoardStore must be use within BoardStoreProvider`);
  }

  return useStore(boardStoreContext, selector);
};
