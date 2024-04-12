import type { ReactNode } from 'react';

export type ContainerConfig = {
  id: string;
  name: string;
  Content: ReactNode | undefined;
};

export type ContainerWithoutContent = Omit<ContainerConfig, 'Content'>;

export type Containers = Array<ContainerConfig>;
