import React from 'react';

import { BoardStoreProvider } from '../../providers/BoardStoreProvider';
import BoardContent from './BoardContent';
import BoardHeader from './BoardHeader';
import { ContainerConfig } from '../../types/board';

interface Props {
  containersConfig: ContainerConfig[];
}

function Board({ containersConfig }: Props) {
  return (
    <BoardStoreProvider initialState={containersConfig}>
      <div className="min-h-full grid grid-cols-1 grid-rows-[50px,1fr] gap-4">
        <BoardHeader />
        <BoardContent />
      </div>
    </BoardStoreProvider>
  );
}

export default Board;
