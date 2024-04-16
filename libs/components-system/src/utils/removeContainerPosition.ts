import { Containers } from '../types/board.d';

export function removeContainerPosition(
  id: string,
  containersState: Containers
): Containers {
  const containerToRemoveIndex = containersState.findIndex(
    (container) => container.id === id
  );

  const containerToRemove = containersState[containerToRemoveIndex];

  const isInAColumn =
    containersState.filter((container) => {
      return container.position?.row === containerToRemove.position?.row;
    }).length > 1;

  const newContainers = containersState?.filter(
    (containerItem) => containerItem.id !== id
  );

  return newContainers.map((container) => {
    if (
      isInAColumn &&
      container.position?.row === containerToRemove.position?.row &&
      container.position?.col > containerToRemove.position?.col
    ) {
      container.position.col -= 1;
    } else if (
      !isInAColumn &&
      container.position?.row > containerToRemove.position?.row
    ) {
      container.position.row -= 1;
    }

    return container;
  });
}
