import React, { forwardRef } from 'react';

import { BoardStoreProvider } from '../../providers/BoardStoreProvider';
import BoardContent from './ui/BoardContent';
import BoardHeader from './ui/BoardHeader';
import { ContainerConfig } from '../../types/board';
import { SharedActionsInRef } from './ui/SharedActionsInRef';

interface Props {
  containersConfig: ContainerConfig[];
}

const Board = forwardRef(({ containersConfig }: Props, ref) => {
  return (
    <BoardStoreProvider initialState={containersConfig}>
      <div className="min-h-full grid grid-cols-1 grid-rows-[50px,1fr] gap-4">
        <SharedActionsInRef ref={ref} />
        <BoardHeader />
        <BoardContent />
      </div>
    </BoardStoreProvider>
  );
});

export default Board;
