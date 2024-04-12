import React from 'react';
import { usePopupsContainer, usePopupsActions } from '../../hooks/usePopups';

function BoardHeader() {
  const { addContainer, clearContainers } = usePopupsActions();
  const { baseContainer } = usePopupsContainer();

  return (
    <div className="bg-green-500 rounded-lg h-full px-4 flex items-center gap-4">
      {baseContainer?.map((containerBase) => (
        <button
          key={containerBase.id}
          onClick={() => addContainer(containerBase)}
          className="bg-white h-auto px-4 py-1 rounded-lg border-2 border-solid border-green-700 font-bold text-gray-800"
        >
          Add({containerBase.name})
        </button>
      ))}
      <button
        onClick={clearContainers}
        className="bg-white h-auto px-4 py-1 rounded-lg border-2 border-solid border-green-700 font-bold text-gray-800"
      >
        Delete all
      </button>
    </div>
  );
}

export default BoardHeader;
