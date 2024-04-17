import React, { Fragment, Suspense, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { usePopupsContainer } from '../../../hooks/usePopups';

import { HorizontalSeparator } from '../../HorizontalSeparator';
import { VerticalSeparator } from '../../VerticalSeparator';
import ContainerWithSeparators from './ContainerWithSeparators';

function BoardContent() {
  const boardRef = useRef<HTMLDivElement>(null);
  const { containersLayout } = usePopupsContainer();

  const hasContainers = containersLayout?.length > 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        ref={boardRef}
        className="relative overflow-auto bg-gray-700 rounded-xl flex flex-col transition-all"
      >
        <Suspense fallback={'Loading...'}>
          {containersLayout.map((rowContainer, row) => (
            <Fragment key={rowContainer.reduce((key, c) => key + c.id, 'row_')}>
              <HorizontalSeparator
                row={row}
                containersInRow={rowContainer.length}
              />
              <div className="min-h-[200px] min-w-[200px] w-full flex transition-all">
                {rowContainer.map((container) => (
                  <ContainerWithSeparators
                    key={container.id}
                    id={container.id}
                    containersInRow={rowContainer.length}
                    boardRef={boardRef.current}
                  />
                ))}
                <VerticalSeparator
                  row={row}
                  col={rowContainer.length}
                  containersInRow={rowContainer.length}
                />
              </div>
            </Fragment>
          ))}
          {hasContainers ? (
            <HorizontalSeparator
              row={containersLayout.length}
              containersInRow={containersLayout?.[0]?.length || 1}
            />
          ) : null}
        </Suspense>
      </div>
    </DndProvider>
  );
}

export default BoardContent;
