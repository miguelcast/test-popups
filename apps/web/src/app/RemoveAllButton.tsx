import React from 'react';
import { Button } from '@test-popups/components-system';

type Props = {
  onRemove: () => void;
};

function RemoveAllButton({ onRemove }: Props) {
  return (
    <div className="fixed right-8 top-8 z-10">
      <Button onClick={onRemove}>
        <>
          <span className="inline sm:hidden">X</span>
          <span className="hidden sm:inline">Remove all</span>
        </>
      </Button>
    </div>
  );
}

export default RemoveAllButton;
