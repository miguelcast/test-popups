import React from 'react';
import {
  usePopupsActions,
  usePopupsBaseContainers,
} from '../../../hooks/usePopups';

function BoardHeader() {
  const { addContainer, clearContainers } = usePopupsActions();
  const { baseContainer } = usePopupsBaseContainers();

  return (
    <div className="bg-gray-700 rounded-full h-full px-4 flex items-center gap-4">
      {baseContainer?.map((containerBase) => (
        <button
          key={containerBase.id}
          onClick={() => addContainer(containerBase)}
          className="bg-white h-auto px-4 py-1 rounded-full font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          Add {containerBase.name}
        </button>
      ))}
      <button
        onClick={clearContainers}
        className="bg-white h-auto px-4 py-1 rounded-full font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500"
      >
        Remove all
      </button>
    </div>
  );
}

export default BoardHeader;
