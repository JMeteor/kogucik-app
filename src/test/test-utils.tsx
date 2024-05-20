import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import theme from '../theme.ts';
import '../i18n';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../App.tsx';

const queryClient = new QueryClient();

const ContextProvidersWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

const renderWithRouter = (
  ui: ReactElement,
  {
    route = '/',
    ...options
  }: Omit<RenderOptions, 'wrapper'> & { route?: string } = {},
) => {
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ContextProvidersWrapper,
      ...options,
    }),
  };
};

const renderWithRouter2 = (route = '/') => {
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={createBrowserRouter(routes)} />),
  };
};

export * from '@testing-library/react';
export { renderWithRouter };
