// This is fine, but can also be done with CSS In JS
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Root from './routes/root';

import theme from './theme.ts';
import Index from './routes';

import AddInvoice from './routes/add-invoice.tsx';
import ViewInvoice from './routes/view-invoice.tsx';
import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Suspense } from 'react';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // It requires additional configuration to work with react-query
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: '/add-invoice',
        element: <AddInvoice />,
      },
      {
        path: '/invoice/:id',
        element: <ViewInvoice />,
      },
      {
        path: '/invoice/:id/edit',
        element: <ViewInvoice isEditMode />,
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

// Client should be created outside the component
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
