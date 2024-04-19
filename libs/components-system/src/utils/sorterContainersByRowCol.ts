import { type Containers } from '../types/board';

export function sorterContainersByRowCol(containers: Containers) {
  containers.sort((containerA, containerB) => {
    if (containerA.position?.row === containerB.position?.row) {
      return (
        Number(containerA.position?.col) - Number(containerB.position?.col)
      );
    }
    return Number(containerA.position?.row) - Number(containerB.position?.row);
  });

  return containers;
}
