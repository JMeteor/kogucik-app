import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Root from './routes/root';
import { InvoiceListPage } from './routes/invoice-list';
import { AddInvoicePage } from './routes/add-invoice';
import { ViewInvoicePage } from './routes/view-invoice';

import './App.css';

import theme from './theme.ts';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationProvider from './providers/NotificationProvider.tsx';

export const routes = [
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
];

export const router = createBrowserRouter(routes);

function Page() {
  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
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
