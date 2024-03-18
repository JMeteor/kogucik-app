import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Root from './routes/root';
import { InvoiceList } from './routes/invoice-list.tsx';
import { AddInvoicePage } from './routes/add-invoice.tsx';
import { ViewInvoicePage } from './routes/view-invoice.tsx';

import './App.css';

import theme from './theme.ts';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <InvoiceList /> },
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
