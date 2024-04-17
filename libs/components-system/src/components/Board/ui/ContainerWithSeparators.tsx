import React, { memo, useCallback } from 'react';
import { VerticalSeparator } from '../../VerticalSeparator';
import { Container } from '@test-popups/components-system';
import { usePopupsContainerById } from '../../../hooks/usePopups';

type Props = {
  id: string;
  boardRef: HTMLDivElement | null;
  containersInRow: number;
};

function ContainerWithSeparators({ id, boardRef, containersInRow }: Props) {
  const { container: { position, name, Content } = {} } =
    usePopupsContainerById(id);

  const render = useCallback(
    (id: string) => (Content ? <Content key={id} /> : null),
    []
  );

  return (
    <>
      <VerticalSeparator
        row={position?.row || 0}
        col={position?.col || 0}
        containersInRow={containersInRow}
      />
      <Container
        id={id}
        name={name || ''}
        row={position?.row || 0}
        col={position?.col || 0}
        boardRef={boardRef}
        render={render}
      />
    </>
  );
}

export default memo(ContainerWithSeparators);
