import React, { Fragment, Suspense, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { usePopupsContainer } from '../../../hooks/usePopups';

import { HorizontalSeparator } from '../../HorizontalSeparator';
import ContainerWithSeparators from './ContainerWithSeparators';

function BoardContent() {
  const boardRef = useRef<HTMLDivElement>(null);
  const { containersLayout } = usePopupsContainer();

  const hasContainers = containersLayout?.length > 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <Suspense fallback={'Loading...'}>
        <div
          ref={boardRef}
          className="relative overflow-auto bg-gray-700 rounded-xl flex w-full flex-wrap content-start transition-all"
        >
          {containersLayout.map((container) => {
            return (
              <Fragment key={`item_${container.id}`}>
                {container.position.col === 0 && (
                  <HorizontalSeparator
                    id={container.id}
                    row={container.position?.row}
                    containersInRow={container.size.w}
                  />
                )}
                <ContainerWithSeparators
                  id={container.id}
                  row={container.position.row}
                  col={container.position.col}
                  containersInRow={container.size.w}
                  boardRef={boardRef.current}
                  showRightSeparator={
                    container.size.w - 1 === container.position.col
                  }
                />
              </Fragment>
            );
          })}
          {hasContainers ? (
            <HorizontalSeparator
              id="last"
              row={
                Math.max(...containersLayout.map((c) => c.position?.row ?? 0)) +
                1
              }
              containersInRow={1}
            />
          ) : null}
        </div>
      </Suspense>
    </DndProvider>
  );
}

export default BoardContent;
