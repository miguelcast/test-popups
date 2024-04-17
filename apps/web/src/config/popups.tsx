import { ComponentA } from '@test-popups/component-a';
import { ComponentB } from '@test-popups/component-b';
import type { Containers } from '@test-popups/components-system';

export const popups: Containers = [
  {
    id: `colors`,
    name: 'Colors',
    Content: ComponentA,
    position: { row: 0, col: 0 },
  },
  {
    id: `timer`,
    name: 'Timer',
    Content: ComponentB,
    position: { row: 1, col: 0 },
  },
];
