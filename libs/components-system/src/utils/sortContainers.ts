import { Containers } from '../types/board';
import { sorterContainersByRowCol } from './sorterContainersByRowCol';

export function sorterContainers(containers: Containers) {
  return sorterContainersByRowCol(containers).map((container) => {
    const containerInRow = containers.reduce((count, c): number => {
      return c.position.row === container.position.row ? count + 1 : count;
    }, 0);

    return { ...container, size: { w: containerInRow } };
  });
}
