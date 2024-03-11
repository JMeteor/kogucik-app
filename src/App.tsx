import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Root from './routes/root';
import AddInvoicePage from './routes/add-invoice.tsx';
import InvoiceListPage from './routes/invoice-list-page.tsx';
import ViewInvoicePage from './routes/view-invoice.tsx';

import './App.css';
import theme from './theme.ts';

import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Zmienic na date-fns
import { LocalizationProvider } from '@mui/x-date-pickers';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <InvoiceListPage /> },
      {
        path: '/add-invoice',
        element: <AddInvoicePage />,
      },
      {
        path: '/invoice/:id',
        element: <ViewInvoicePage />,
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
