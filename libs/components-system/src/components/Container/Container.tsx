import React, { memo, type ReactNode, useRef } from 'react';
import { type ContainerWithoutContent } from '../../types/board';
import { usePopupsActions } from '../../hooks/usePopups';

type Props = {
  children: ReactNode | undefined;
} & ContainerWithoutContent;

function Container({ id, name, children }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { removeContainer } = usePopupsActions();

  return (
    <section
      ref={containerRef}
      className="min-w-max h-48 rounded-md bg-white border-solid border-2 border-gray-400 resize"
    >
      <div className="bg-blue-400 py-1 px-4 flex items-center justify-between">
        <h2 className="font-bold">{name}</h2>
        <div>
          <button
            onClick={() => removeContainer(id)}
            className="bg-white px-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export default memo(Container);
