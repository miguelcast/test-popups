import { type Containers } from '../types/board';

export function updateContainerPosition(
  containersState: Containers,
  id: string,
  row: number,
  col?: number
): Containers {
  let newContainers = [...containersState];
  const containerToMoveIndex = newContainers.findIndex(
    (container) => container.id === id
  );
  const containerToMove = {
    ...containersState[containerToMoveIndex],
    position: { ...newContainers[containerToMoveIndex].position },
  };

  newContainers.sort((containerA, containerB) => {
    if (containerA.position?.row === containerB.position?.row) {
      return (
        Number(containerA.position?.col) - Number(containerB.position?.col)
      );
    }
    return Number(containerA.position?.row) - Number(containerB.position?.row);
  });

  const fromColumn =
    containersState.filter((container) => {
      return container.position?.row === containerToMove.position?.row;
    }).length > 1;

  const direction = containerToMove.position.row > row ? 'UP' : 'DOWN';

  if (row !== containerToMove.position.row) {
    newContainers = newContainers.map((container) => {
      if (container.id === id) {
        let newRow = (container.position.row =
          direction === 'DOWN' ? row - 1 : row);

        let newCol = col ?? container.position.col;

        if (fromColumn) {
          newRow = row;
          if (col === undefined) {
            newCol = 0;
          }
        }

        container.position.row = newRow;
        container.position.col = newCol;
        return container;
      }

      if (col !== undefined && Number.isInteger(col)) {
        if (container.position.row === row && container.position.col >= col) {
          container.position.col += 1;
        }

        if (
          fromColumn &&
          container.position.row === containerToMove.position?.row &&
          container.position.col > containerToMove.position.col
        ) {
          container.position.col -= 1;
        }
      }

      if (
        col === undefined &&
        !fromColumn &&
        direction === 'DOWN' &&
        container.position.row < row &&
        container.position.row >= containerToMove.position.row
      ) {
        container.position.row -= 1;
      }

      if (
        col === undefined &&
        !fromColumn &&
        direction === 'UP' &&
        container.position.row >= row &&
        container.position.row < containerToMove.position.row
      ) {
        container.position.row += 1;
      }

      if (
        Number.isInteger(col) &&
        !fromColumn &&
        container.position.row >= containerToMove.position.row
      ) {
        container.position.row -= 1;
      }

      if (col === undefined && fromColumn && container.position.row >= row) {
        container.position.row += 1;
      }

      return container;
    });
  }

  return newContainers;
}
