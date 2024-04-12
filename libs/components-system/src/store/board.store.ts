import { create } from 'zustand';
import type { Containers, ContainerConfig } from '../types/board';

type State = {
  containers: Containers;
  baseContainer: Containers;
};

type Action = {
  setContainers: (containers: Containers) => void;
  addContainer: (container: ContainerConfig) => void;
  removeContainer: (id: string) => void;
  clearContainers: () => void;
};

export type BoardStore = State & Action;

export const createBoardStore = (initialState: Containers) =>
  create<BoardStore>()((set) => ({
    containers: [...initialState] || [],
    baseContainer: [...initialState] || [],
    setContainers: (containers: Containers) =>
      set((state) => ({ containers: [...state.containers, ...containers] })),
    clearContainers: () => set(() => ({ containers: [] })),
    addContainer: (container) =>
      set((state) => ({ containers: [...state.containers, container] })),
    removeContainer: (id) =>
      set((state) => ({
        containers: state.containers?.filter(
          (containerItem) => containerItem.id !== id
        ),
      })),
  }));
