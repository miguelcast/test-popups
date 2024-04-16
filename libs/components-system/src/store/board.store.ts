import { create } from 'zustand';
import type { Containers, ContainerConfig } from '../types/board';
import { updateContainerPosition } from '../utils/updateContainerPosition';
import { removeContainerPosition } from '../utils/removeContainerPosition';

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
        const newContainers = removeContainerPosition(id, state.containers);
        return { containers: newContainers };
      }),
    changePosition: (id, row, col) =>
      set((state) => {
        const newContainers = updateContainerPosition(
          state.containers,
          id,
          row,
          col
        );

        return { containers: newContainers };
      }),
  }));
