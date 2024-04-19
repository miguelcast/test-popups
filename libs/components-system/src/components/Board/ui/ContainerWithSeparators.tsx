import React, { memo } from 'react';
import { VerticalSeparator } from '../../VerticalSeparator';
import { usePopupsContainerById } from '../../../hooks/usePopups';
import Container from '../../Container/Container';

type Props = {
  id: string;
  row: number;
  col: number;
  boardRef: HTMLDivElement | null;
  containersInRow: number;
  showRightSeparator: boolean;
};

const styleWidths = ['w-full', 'w-full', 'w-1/2', 'w-1/3', 'w-1/4'];

function ContainerWithSeparators({
  id,
  row,
  col,
  boardRef,
  containersInRow,
  showRightSeparator,
}: Props) {
  const { container } = usePopupsContainerById(id);

  const containerWidthStyle = styleWidths?.[containersInRow] ?? styleWidths[0];

  const Content = container?.Content;

  return (
    <div className={`min-w-[200px] h-[200px] ${containerWidthStyle} flex`}>
      <VerticalSeparator
        id={id}
        row={row || 0}
        col={col || 0}
        containersInRow={containersInRow}
      />
      <Container
        id={id}
        name={container?.name || ''}
        row={row || 0}
        col={col || 0}
        boardRef={boardRef}
      >
        {!!Content && <Content />}
      </Container>
      {showRightSeparator && (
        <VerticalSeparator
          id={id}
          row={row || 0}
          col={(col ?? 0) + 1 || 0}
          containersInRow={containersInRow}
        />
      )}
    </div>
  );
}

export default memo(ContainerWithSeparators);
