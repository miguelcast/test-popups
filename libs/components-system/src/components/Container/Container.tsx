import React, { memo, type ReactNode, useRef } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';

import { type ContainerWithIdName } from '../../types/board';
import { usePopupsActions } from '../../hooks/usePopups';
import { DragTypes } from '../../utils/dragTypes';
import previewImage from '../../assets/preview-container.webp';
import { useResize } from '../../hooks/useResize';

type Props = {
  row: number;
  col: number;
  boardRef: HTMLDivElement | null;
  render: (id: string) => JSX.Element | null;
} & ContainerWithIdName;

function Container({ id, name, row, col, boardRef, render }: Props) {
  const { removeContainer } = usePopupsActions();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: DragTypes.CONTAINER,
    item: { id, row, col },
    collect: (monitor) => ({
      isDragging: Boolean(monitor.isDragging()),
    }),
  }));

  const { separatorProps } = useResize(containerRef, boardRef);

  const dragContainerStyles = isDragging ? `opacity-20` : '';

  const setRefs = (element: HTMLDivElement) => {
    if (element) {
      containerRef.current = element;
      dragRef(element);
    }
  };

  return (
    <>
      <DragPreviewImage connect={preview} src={previewImage} key={id} />
      <section
        ref={setRefs}
        data-id={id}
        draggable
        className={`relative overflow-clip min-h-full  flex-1 flex flex-col rounded-xl bg-[#ffffffcc] ${dragContainerStyles}`}
      >
        <div className="py-1 px-4 flex items-center justify-between bg-gradient-to-r from-gray-900 from-10% to-gray-800 from-90% cursor-grab active:cursor-grabbing">
          <h2 className="font-bold text-white">{name}</h2>
          <div>
            <button
              onClick={() => removeContainer(id)}
              className="bg-white px-2 rounded-full w-5 h-5 flex items-center justify-center font-bold"
              aria-label="Close Popup button"
            >
              X
            </button>
          </div>
        </div>
        <div className="w-full flex-1 overflow-auto">{render(id)}</div>
        <div
          {...separatorProps}
          className="group absolute -bottom-1 w-full h-2 cursor-row-resize flex items-center justify-center"
        />
      </section>
    </>
  );
}

export default memo(Container);
