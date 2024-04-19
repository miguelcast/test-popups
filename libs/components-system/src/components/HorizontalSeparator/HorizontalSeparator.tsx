import React, { memo } from 'react';
import { useDrop } from 'react-dnd';

import { usePopupsActions } from '../../hooks/usePopups';
import { DragTypes } from '../../utils/dragTypes';
import { type DragItem } from '../../types/board';

type Props = {
  id: string;
  row: number;
  containersInRow: number;
};

function HorizontalSeparator({ id, row, containersInRow }: Props) {
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
      canDrop: (item) =>
        (item.row !== row && item.row + 1 !== row) ||
        (item.row !== row && containersInRow >= 1),
      drop: (item) => {
        changePosition(item?.id, row);
        return undefined;
      },
    },
    [id, row, containersInRow]
  );

  const dropOverStyle = isOver && canDrop ? 'opacity-100 bg-purple-500' : '';
  const highlightPossibleDrop =
    canDrop && !isOver ? 'opacity-50 bg-gray-500' : '';

  return (
    <div
      ref={dropRef}
      className="w-full h-6 flex items-center justify-center px-12"
    >
      <div
        className={`h-1 w-full rounded-full opacity-0 transition-opacity ${highlightPossibleDrop} ${dropOverStyle}`}
      />
    </div>
  );
}

export default memo(HorizontalSeparator);
