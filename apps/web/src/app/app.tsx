import { Board, type Containers } from '@test-popups/components-system';
import { ComponentA } from '@test-popups/component-a';
import { ComponentB } from '@test-popups/component-b';
import { memo, Suspense } from 'react';

const ComponentASuspense = memo(() => (
  <Suspense fallback="Loading...">
    <ComponentA />
  </Suspense>
));

const ComponentBSuspense = memo(() => (
  <Suspense fallback="Loading...">
    <ComponentB />
  </Suspense>
));

const containers: Containers = [
  {
    id: `A`,
    name: 'A',
    Content: ComponentASuspense,
    position: { row: 0, col: 0 },
  },
  {
    id: `B`,
    name: 'B',
    Content: ComponentBSuspense,
    position: { row: 1, col: 0 },
  },
];

export function App() {
  return (
    <main className="h-full p-6">
      <Board containersConfig={containers} />
    </main>
  );
}

export default App;
