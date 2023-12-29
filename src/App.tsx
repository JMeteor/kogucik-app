import { useState } from 'react';
import './App.css';
import styles from './App.module.css';
import Button from './components/Button.tsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={styles.appContainer}>
        <header className={`bg-[#8A2BE2FF] ${styles.header}`}>
          <h1 className="text-3xl font-bold underline">KOGUCIK APP</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <Button
              variant={'primary'}
              onClick={() => setCount((count) => count + 1)}
            >
              Click me!
            </Button>
            <Button
              variant={'secondary'}
              onClick={() => setCount((count) => count - 1)}
            >
              Cancel
            </Button>
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
