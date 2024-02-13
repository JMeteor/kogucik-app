import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test("renders company's header", () => {
  render(<App />);
  const header = screen.getByText(/KOGUCIK APP/i);
  expect(header).toBeDefined();
});
