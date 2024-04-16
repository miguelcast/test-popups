import React, { Fragment, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { usePopupsContainer } from '../../hooks/usePopups';
import { Container } from '../Container';
import { HorizontalSeparator } from '../HorizontalSeparator';
import { VerticalSeparator } from '../VerticalSeparator';

function BoardContent() {
  const { containersLayout } = usePopupsContainer();

  const boardRef = useRef<HTMLDivElement>(null);

  const areContainers = containersLayout?.length > 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        ref={boardRef}
        className="relative overflow-auto bg-gray-200 rounded-xl flex flex-col"
      >
        {containersLayout.map((rowContainer, row) => (
          <Fragment key={row}>
            <HorizontalSeparator row={row} />
            <div key={row} className="min-h-[200px] min-w-[200px] w-full flex">
              {rowContainer.map(({ id, name, Content, position }, col) => (
                <Fragment key={id}>
                  <VerticalSeparator
                    row={row}
                    col={col}
                    containersInRow={rowContainer.length}
                  />
                  <Container
                    key={id}
                    id={id}
                    name={name}
                    row={position?.row || row}
                    col={position?.col || col}
                  >
                    {Content}
                  </Container>
                </Fragment>
              ))}
              <VerticalSeparator
                row={row}
                col={rowContainer.length}
                containersInRow={rowContainer.length}
              />
            </div>
          </Fragment>
        ))}
        {areContainers ? (
          <HorizontalSeparator row={containersLayout.length} />
        ) : null}
      </div>
    </DndProvider>
  );
}

export default BoardContent;
