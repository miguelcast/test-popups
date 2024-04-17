import { Containers } from '../types/board';

export function sorterContainers(containers: Containers): Containers[] {
  const sortedContainers: Containers[] = [];

  for (const container of containers) {
    const row = container.position?.row ?? sortedContainers.length;
    const col = container.position?.col;

    if (!sortedContainers[row]) {
      sortedContainers[row] = [];
    }

    if (col === undefined || sortedContainers[row][col] === undefined) {
      sortedContainers[row][col ?? sortedContainers[row].length] = container;
    } else {
      sortedContainers[row].push(container);
    }
  }

  return sortedContainers;
}
