import { useState } from 'react';
import styles from '../App.module.css';
import MyButton from './Button.tsx';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { green } from '@mui/material/colors';

function Component() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={styles.appContainer}>
        <header className={`bg-[#8A2BE2FF] ${styles.header}`}>
          <h1 className="text-3xl font-bold underline">KOGUCIK APP</h1>
        </header>
        <section>
          <h2>Button test</h2>
          <div>
            <strong>count: {count}</strong>
            <MyButton
              variant={'primary'}
              onClick={() => setCount((count) => count + 1)}
            >
              Add
            </MyButton>
            <MyButton
              variant={'secondary'}
              onClick={() => setCount((count) => count - 1)}
            >
              Subtract
            </MyButton>
            <Button variant="contained">Hello world</Button>
          </div>
        </section>
        <section>
          <h2>Icon test</h2>
          <div>
            <Icon>add_circle</Icon>
            <Icon color="primary">add_circle</Icon>
            <Icon sx={{ color: green[500] }}>add_circle</Icon>
            <Icon fontSize="small">add_circle</Icon>
            <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
          </div>
        </section>
      </div>
    </>
  );
}

export default Component;
