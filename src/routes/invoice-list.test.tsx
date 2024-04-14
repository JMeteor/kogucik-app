import { describe, expect, it } from 'vitest';
import { renderWithRouter } from '../test/test-utils.tsx';
import { screen, waitFor } from '@testing-library/react';
import App from '../App.tsx';

describe('InvoiceListPage', () => {
  renderWithRouter(<App />);

  it('renders page title correctly', async () => {
    await waitFor(
      async () => {
        expect(await screen.findByText(/Invoice 1/i)).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
