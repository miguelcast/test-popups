import { useBoardStore } from './useBoardStore';
import type { ContainerConfig } from '../types/board';
import { sorterContainers } from '../utils/sortContainers';
import { generateUniqueId } from '../utils/generateUniqueId';

function containerFactory(container: ContainerConfig): ContainerConfig {
  const id = `${container.id}_${generateUniqueId()}`;
  return { ...container, id };
}

export function usePopupsActions() {
  const addContainer = useBoardStore((store) => store.addContainer);
  const removeContainer = useBoardStore((store) => store.removeContainer);
  const clearContainers = useBoardStore((store) => store.clearContainers);
  const changePosition = useBoardStore((store) => store.changePosition);

  function addContainerHandler(containerBase: ContainerConfig) {
    const newContainer = containerFactory(containerBase);
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

  return { containers, containersLayout: containersLayout };
}

export function usePopupsBaseContainers() {
  const baseContainer = useBoardStore((store) => store.baseContainer);
  return { baseContainer };
}

export function usePopupsContainerById(id: string) {
  const container = useBoardStore((store) =>
    store.containers.find((c) => c.id === id)
  );
  return { container };
}
