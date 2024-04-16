import type { ReactNode } from 'react';

export type PositionContainer = {
  col?: number;
  row?: number;
};

export type SizeContainer = {
  w?: number;
  h?: number;
};

export type ContainerConfig = {
  id: string;
  name: string;
  Content: ReactNode | undefined;
  position?: PositionContainer;
  size?: SizeContainer;
};

export type ContainerWithIdName = Pick<ContainerConfig, 'id' | 'name'>;

export type Containers = Array<ContainerConfig>;

export type DragItem = {
  id: string;
  row: number;
  col: number;
};
