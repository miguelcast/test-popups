import React, { memo, type ReactNode } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';

import { type ContainerWithIdName } from '../../types/board';
import { usePopupsActions } from '../../hooks/usePopups';
import { DragTypes } from '../../utils/dragTypes';
import previewImage from '../../assets/preview-container.webp';

type Props = {
  row: number;
  col: number;
  children: ReactNode | undefined;
} & ContainerWithIdName;

function Container({ id, name, row, col, children }: Props) {
  const { removeContainer } = usePopupsActions();

  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: DragTypes.CONTAINER,
    item: { id, row, col },
    collect: (monitor) => ({
      isDragging: Boolean(monitor.isDragging()),
    }),
  }));

  const dragContainerStyles = isDragging ? `opacity-20` : '';

  return (
    <>
      <DragPreviewImage connect={preview} src={previewImage} key={id} />
      <section
        ref={dragRef}
        data-id={id}
        draggable
        className={`relative min-h-full flex-1 rounded-md bg-white border-solid border-2 border-gray-400 transition-all ${dragContainerStyles}`}
      >
        <div className="bg-blue-400 py-1 px-4 flex items-center justify-between cursor-grab active:cursor-grabbing">
          <h2 className="font-bold">{name}</h2>
          <div>
            <button
              onClick={() => removeContainer(id)}
              className="bg-white px-2 rounded-full w-6 h-6 flex items-center justify-center font-bold"
            >
              X
            </button>
          </div>
        </div>
        <div className="p-4">{children}</div>
      </section>
    </>
  );
}

export default memo(Container);
