import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';
import { mockInvoice } from "./mocks/invoice.mock.ts";

test("renders company's header", async () => {
  render(<App />);

  expect(await screen.findByText(mockInvoice.name)).toBeInTheDocument();
});
