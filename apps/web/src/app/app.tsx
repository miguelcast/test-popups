import { Board, type Containers } from '@test-popups/components-system';

function ComponentA() {
  return <h1>Component Content A</h1>;
}

function ComponentB() {
  return <h1>Component Content B</h1>;
}

const containers: Containers = [
  {
    id: `A`,
    name: 'Component A',
    Content: <ComponentA />,
  },
  {
    id: `B`,
    name: 'Component B',
    Content: <ComponentB />,
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
