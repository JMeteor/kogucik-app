import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';

import theme from './theme.ts';
import Index from './routes';

import AddInvoice from './routes/add-invoice.tsx';
import ViewInvoice from './routes/view-invoice.tsx';
import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Suspense } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: '/add-invoice',
        element: <AddInvoice />,
      },
      {
        path: '/invoices/:id',
        element: <ViewInvoice />,
      },
      {
        path: '/invoices/:id/edit',
        element: <ViewInvoice />,
      },
    ],
  },
]);

function Page() {
  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

const Loader = () => (
  <div className="app">
    <div>loading...</div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}
