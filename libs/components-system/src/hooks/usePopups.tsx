import { useBoardStore } from './useBoardStore';
import type { ContainerConfig } from '../types/board.d';
import { sorterContainers } from '../utils/sortContainers';

function generateUniqueId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function generateContainer(container: ContainerConfig): ContainerConfig {
  return {
    ...container,
    id: `${container.id}_${generateUniqueId()}`,
  };
}

export function usePopupsActions() {
  const addContainer = useBoardStore((store) => store.addContainer);
  const removeContainer = useBoardStore((store) => store.removeContainer);
  const clearContainers = useBoardStore((store) => store.clearContainers);
  const changePosition = useBoardStore((store) => store.changePosition);

  function addContainerHandler(containerBase: ContainerConfig) {
    const newContainer = generateContainer(containerBase);
    addContainer(newContainer);
  }

  function clearContainerHandler() {
    if (window.confirm('Are you sure about removing the windows?')) {
      clearContainers();
    }
  }

  return {
    removeContainer,
    addContainer: addContainerHandler,
    clearContainers: clearContainerHandler,
    changePosition: changePosition,
  };
}

export function usePopupsContainer() {
  const containers = useBoardStore((store) => store.containers);
  const containersLayout = useBoardStore((store) =>
    sorterContainers(store.containers)
  );
  const baseContainer = useBoardStore((store) => store.baseContainer);

  return { containers, containersLayout, baseContainer };
}
