import React, { memo } from 'react';
import { useDrop } from 'react-dnd';

import { usePopupsActions } from '../../hooks/usePopups';
import { DragTypes } from '../../utils/dragTypes';
import { type DragItem } from '../../types/board';

type Props = {
  row: number;
  col: number;
  containersInRow: number;
};

function VerticalSeparator({ row, col, containersInRow }: Props) {
  const { changePosition } = usePopupsActions();

  const [{ isOver, canDrop }, dropRef] = useDrop<
    DragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >(
    {
      accept: DragTypes.CONTAINER,
      collect: (monitor) => ({
        isOver: Boolean(monitor.isOver()),
        canDrop: Boolean(monitor.canDrop()),
      }),
      canDrop: (item) => item.row !== row && containersInRow <= 3,
      drop: (item) => {
        changePosition(item?.id, row, col);
        return undefined;
      },
    },
    [row, col, containersInRow]
  );

  const dropOverStyle = isOver && canDrop ? 'opacity-100 bg-purple-500' : '';
  const highlightPossibleDrop =
    canDrop && !isOver ? 'opacity-50 bg-gray-500' : '';

  return (
    <div
      ref={dropRef}
      className="w-6 h-full flex items-center justify-center py-12"
    >
      <div
        className={`w-1 h-full rounded-full opacity-0 transition-opacity ${highlightPossibleDrop} ${dropOverStyle}`}
      />
    </div>
  );
}

export default memo(VerticalSeparator);
