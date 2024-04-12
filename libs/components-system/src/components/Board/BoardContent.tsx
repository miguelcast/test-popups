import React from 'react';

import { usePopupsContainer } from '../../hooks/usePopups';
import { Container } from '../Container';

function BoardContent() {
  const { containers } = usePopupsContainer();

  return (
    <div className="relative bg-gray-200 p-4 rounded-xl grid grid-cols-containers auto-rows-min row gap-2">
      {containers.map(({ id, name, Content }) => (
        <Container key={id} id={id} name={name}>
          {Content}
        </Container>
      ))}
    </div>
  );
}

export default BoardContent;
