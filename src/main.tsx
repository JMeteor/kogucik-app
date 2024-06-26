import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import App from './App.tsx';

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'true') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start();
}

enableMocking()
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  })
  .catch((error) => {
    console.error('Error while enabling mocks:', error);
  });
