import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Root from './routes/root';

import theme from './theme.ts';
import Index from './routes';

import AddInvoice from './routes/add-invoice.tsx';
import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Suspense } from 'react';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import EditInvoicePage from './routes/edit-invoice.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: '/add-invoice',
        element: <AddInvoice />,
      },
      {
        path: '/invoice/:id',
        element: <EditInvoicePage isEditMode={false} />,
      },
      {
        path: '/invoice/:id/edit',
        element: <EditInvoicePage isEditMode={true} />,
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

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <Page />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
