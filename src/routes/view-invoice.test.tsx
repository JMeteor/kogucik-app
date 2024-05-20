import { describe, expect, it } from 'vitest';
import { renderWithRouter, screen } from '../test/test-utils.tsx';
import App from '../App.tsx';
import { waitFor } from '@testing-library/react';

describe('ViewInvoicePage', () => {
  const { user } = renderWithRouter(<App />);

  it('navigates to the invoice details, edits the name of the invoice and saves the changes', async () => {
    await waitFor(
      () =>
        user.click(
          screen.getByRole('link', {
            name: 'Invoice 1',
          }),
        ),
      {
        timeout: 2000,
      },
    );

    await user.click(
      screen.getByRole('link', {
        name: 'Edit',
      }),
    );

    await user.type(screen.getByLabelText('Name *'), 'Tested Company');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(
      await screen.findByText('Invoice saved successfully.'),
    ).toBeInTheDocument();
  });
});
