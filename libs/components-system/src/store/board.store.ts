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
      set((state) => ({ containers: [...state.containers, container] })),
    removeContainer: (id) =>
      set((state) => ({
        containers: state.containers?.filter(
          (containerItem) => containerItem.id !== id
        ),
      })),
    changePosition: (id, row, col) =>
      set((state) => {
        const containerIndex = state.containers.findIndex(
          (containerItem) => containerItem.id === id
        );

        if (containerIndex === -1) {
          return state;
        }

        const currentContainer = state.containers[containerIndex];

        const sortedContainers = state.containers.filter(
          (container) => container.id !== id
        );

        const currentPosition =
          currentContainer?.position?.row || containerIndex;
        const direction = currentPosition > row ? 'UP' : 'DOWN';
        const range = [
          direction === 'UP' ? row : containerIndex + 1,
          direction === 'UP' ? currentPosition : row - 1,
        ];

        sortedContainers.splice(
          direction === 'UP' ? row : row - 1,
          0,
          currentContainer
        );

        const newContainers = sortedContainers.map((container, index) => {
          const oldRow = state.containers.findIndex(
            (c) => c.id === container.id
          );

          if (container.id === id) {
            return {
              ...container,
              position: {
                row: direction === 'UP' ? row : row - 1,
                col: col ?? container.position?.col ?? 0,
              },
            };
          }

          if (oldRow >= range[0] && oldRow <= range[1]) {
            const newRow = oldRow
              ? direction === 'UP'
                ? oldRow + 1
                : oldRow - 1
              : index;

            return {
              ...container,
              position: {
                row: newRow,
                col: container.position?.col,
              },
            };
          }

          if (!container.position?.row || !container.position?.col) {
            return {
              ...container,
              position: {
                row: container.position?.row ?? index,
                col: container.position?.col ?? 0,
              },
            };
          }

          return container;
        });

        console.log(newContainers);

        return { containers: newContainers };
      }),
  }));
