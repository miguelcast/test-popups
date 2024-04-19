import { Board, type BoardRefActions } from '@test-popups/components-system';
import { popups } from '../config/popups';
import React, { useRef } from 'react';
import RemoveAllButton from './RemoveAllButton';

export function App() {
  const boardRef = useRef<BoardRefActions>(null);

  return (
    <main className="h-full p-6 bg-gray-800">
      <RemoveAllButton
        onRemove={() => boardRef.current?.removeAllContainers()}
      />
      <Board ref={boardRef} containersConfig={popups} />
    </main>
  );
}

export default App;
