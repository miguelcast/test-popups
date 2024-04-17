import { Board } from '@test-popups/components-system';
import { popups } from '../config/popups';

export function App() {
  return (
    <main className="h-full p-6 bg-gray-800">
      <Board containersConfig={popups} />
    </main>
  );
}

export default App;
