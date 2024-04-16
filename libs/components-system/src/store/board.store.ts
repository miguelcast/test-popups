import { create } from 'zustand';
import type { Containers, ContainerConfig } from '../types/board';

type State = {
  containers: Containers;
  baseContainer: Containers;
};

type Action = {
  addContainer: (container: ContainerConfig) => void;
  removeContainer: (id: string) => void;
  clearContainers: () => void;
  changePosition: (id: string, row: number, col?: number) => void;
};

export type BoardStore = State & Action;

export const createBoardStore = (initialState: Containers) =>
  create<BoardStore>()((set) => ({
    containers: [],
    baseContainer: [...initialState] || [],
    clearContainers: () => set(() => ({ containers: [] })),
    addContainer: (container) =>
      set((state) => ({
        containers: [
          ...state.containers,
          { ...container, position: { row: state.containers.length, col: 0 } },
        ],
      })),
    removeContainer: (id) =>
      set((state) => {
        const containerToRemoveIndex = state.containers.findIndex(
          (container) => container.id === id
        );

        const containerToRemove = state.containers[containerToRemoveIndex];

        const isInAColumn =
          state.containers.filter((container) => {
            return container.position?.row === containerToRemove.position?.row;
          }).length > 1;

        const newContainers = state.containers?.filter(
          (containerItem) => containerItem.id !== id
        );

        return {
          containers: newContainers.map((container) => {
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
          }),
        };
      }),
    changePosition: (id, row, col) =>
      set((state) => {
        let newContainers = [...state.containers];
        const containerToMoveIndex = newContainers.findIndex(
          (container) => container.id === id
        );
        const containerToMove = {
          ...newContainers[containerToMoveIndex],
          position: { ...newContainers[containerToMoveIndex].position },
        };

        newContainers.sort((containerA, containerB) => {
          if (containerA.position?.row === containerB.position?.row) {
            return (
              Number(containerA.position?.col) -
              Number(containerB.position?.col)
            );
          }
          return (
            Number(containerA.position?.row) - Number(containerB.position?.row)
          );
        });

        const fromColumn =
          state.containers.filter((container) => {
            return container.position?.row === containerToMove.position?.row;
          }).length > 1;

        const direction = containerToMove.position.row > row ? 'UP' : 'DOWN';

        if (row !== containerToMove.position.row) {
          newContainers = newContainers.map((container) => {
            debugger;
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
              if (
                container.position.row === row &&
                container.position.col >= col
              ) {
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

            if (
              col === undefined &&
              fromColumn &&
              container.position.row >= row
            ) {
              container.position.row += 1;
            }

            return container;
          });
        }

        return { containers: newContainers };
      }),
  }));
