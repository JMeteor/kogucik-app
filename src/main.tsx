import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import App from './App.tsx';
// import { setupWorker } from 'msw/browser';
// import { handlers } from './mocks/handlers.ts';

// if (true) {
//   setupWorker(...handlers);
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
