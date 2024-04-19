import React, { DragEvent, useCallback, useRef } from 'react';

const MIN_HEIGHT = 200;
const MAX_HEIGHT = 500;

export function useResize(
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  boardRef: HTMLDivElement | null
) {
  const basePointContainerRef = useRef<{
    bottom: number;
    height: number;
  } | null>(null);

  function avoidDragging(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  const boardMouseMove = useCallback(
    function (e: MouseEvent): void {
      if (basePointContainerRef.current && containerRef.current?.offsetHeight) {
        let newHeight =
          e.y +
          basePointContainerRef.current?.height -
          basePointContainerRef.current?.bottom;

        newHeight = newHeight > MAX_HEIGHT ? MAX_HEIGHT : newHeight;
        newHeight = newHeight < MIN_HEIGHT ? MIN_HEIGHT : newHeight;

        containerRef.current.style.height = `${newHeight}px`;
      }
    },
    [containerRef]
  );

  const boardMouseUp = useCallback(
    function (e: MouseEvent): void {
      basePointContainerRef.current = null;
      boardRef?.removeEventListener('mousemove', boardMouseMove);
      window?.removeEventListener('mouseup', boardMouseUp);
    },
    [boardMouseMove, boardRef]
  );

  function onMouseDown(e: React.MouseEvent) {
    basePointContainerRef.current = {
      bottom: containerRef.current?.getBoundingClientRect().bottom || 0,
      height: containerRef.current?.getBoundingClientRect().height || 0,
    };
    boardRef?.addEventListener('mousemove', boardMouseMove);
    window?.addEventListener('mouseup', boardMouseUp);
  }

  function onMouseUp(e: React.MouseEvent) {
    boardRef?.removeEventListener('mousemove', boardMouseMove);
  }

  return {
    separatorProps: {
      onMouseUp,
      onMouseDown,
      onDragStart: avoidDragging,
      draggable: true,
    },
  };
}
