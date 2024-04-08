import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { mockInvoice } from './mocks/invoice.mock.ts';
import App from './App';

test("renders company's header", async () => {
  render(<App />);

  expect(await screen.findByText(mockInvoice.name)).toBeInTheDocument();
});
