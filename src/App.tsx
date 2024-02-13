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

// TODO: Czy zawsze akcje formularzy przypisywane są w router configu ?
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     loader: rootLoader,
//     action: rootAction,
//     children: [
//       { index: true, element: <Index /> },
//       {
//         path: 'contacts/:contactId',
//         element: <Contact />,
//         loader: contactLoader,
//         action: contactAction,
//       },
//       {
//         path: 'contacts/:contactId/edit',
//         element: <EditContact />,
//         loader: contactLoader,
//         action: editAction,
//       },
//       {
//         path: 'contacts/:contactId/destroy',
//         element: <EditContact />,
//         loader: contactLoader,
//         action: destroyAction,
//         errorElement: <div>Oops! There was an error.</div>,
//       },
//     ],
//   },
// ]);

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

//componenty się rerenderują zawsze wtedy kiedy zmieni się stan lub props przychodzący z góry
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
