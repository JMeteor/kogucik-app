import { renderWithRouter, screen } from './../test/test-utils.tsx';
import { describe, expect, it } from 'vitest';
import { waitFor, within } from '@testing-library/react';
import App from '../App.tsx';

describe('AddInvoicePage', () => {
  const { user } = renderWithRouter(<App />);

  // render(
  //   <Routes>
  //     <Route element={<InvoiceList />} path="/" />
  //     <Route element={<AddInvoicePage />} path="/add-invoice" />
  //     <Route element={<ViewInvoicePage />} path="/invoce/:id" />
  //   </Routes>,
  // );

  it('fills in the form', async () => {
    await user.click(screen.getByText(/Add Invoice/i));

    const nameField = screen.getByLabelText('Name *') as HTMLInputElement;
    await user.type(nameField, 'Test Company');

    const recipientForm = screen.getByRole('group', { name: 'Recipient' });

    const recipientCompanyNameField = within(recipientForm).getByLabelText(
      'Company name',
    ) as HTMLInputElement;
    await user.type(recipientCompanyNameField, 'Test');

    const recipientCityField = within(recipientForm).getByLabelText(
      'City',
    ) as HTMLInputElement;
    await user.type(recipientCityField, 'Testopolis');

    const recipientStreetField = within(recipientForm).getByLabelText(
      'Street',
    ) as HTMLInputElement;
    await user.type(recipientStreetField, 'Test St.');

    const recipientPostcodeField = within(recipientForm).getByLabelText(
      'Postcode',
    ) as HTMLInputElement;
    await user.type(recipientPostcodeField, '12345');

    const recipientNipField = within(recipientForm).getByLabelText(
      'NIP',
    ) as HTMLInputElement;
    await user.type(recipientNipField, '1234567890');

    const recipientPhoneField = within(recipientForm).getByLabelText(
      'Phone',
    ) as HTMLInputElement;
    await user.type(recipientPhoneField, '1234567890');

    const recipientEmailField = within(recipientForm).getByLabelText(
      'Email',
    ) as HTMLInputElement;
    await user.type(recipientEmailField, 'john.doe@email.com');

    const recipientBankAccountField = within(recipientForm).getByLabelText(
      'Bank account',
    ) as HTMLInputElement;
    await user.type(recipientBankAccountField, 'PL27109024026154175215614473');

    await user.click(screen.getByText('Add item'));

    const orderItemForm = screen.getByRole('group', { name: 'Items' });

    const orderItemNameField = within(orderItemForm).getByLabelText(
      'Name',
    ) as HTMLInputElement;
    await user.type(orderItemNameField, 'Test item');

    const orderItemAmountField = within(orderItemForm).getByLabelText(
      'Amount',
    ) as HTMLInputElement;
    await user.type(orderItemAmountField, '1');

    const orderItemUnitField = within(orderItemForm).getByLabelText(
      'Unit',
    ) as HTMLInputElement;
    await user.type(orderItemUnitField, 'Test');

    const orderItemTaxField = within(orderItemForm).getByLabelText(
      'Tax',
    ) as HTMLInputElement;
    await user.type(orderItemTaxField, '23');

    const orderItemPriceField = within(orderItemForm).getByLabelText(
      'Price',
    ) as HTMLInputElement;
    await user.type(orderItemPriceField, '100');

    // expect(nameField.value).toBe('Test Company');
    // expect(createdField.value).toBe(todayFormated);
    // expect(validField.value).toBe(twoWeeksFromTodayFormated);
    // expect(recipientCompanyNameField.value).toBe('Test');
    // expect(recipientCityField.value).toBe('Testopolis');
    // expect(recipientStreetField.value).toBe('Test St.');
    // expect(recipientPostcodeField.value).toBe('12345');
    // expect(recipientNipField.value).toBe('1234567890');
    // expect(recipientPhoneField.value).toBe('1234567890');
    // expect(recipientEmailField.value).toBe('john.doe@email.com');
    // expect(recipientBankAccountField.value).toBe(
    //   'PL27109024026154175215614473',
    // );
    // expect(orderItemNameField.value).toBe('Test item');
    // expect(orderItemAmountField.value).toBe('1');
    // expect(orderItemUnitField.value).toBe('Test');
    // expect(orderItemTaxField.value).toBe('23');
    // expect(orderItemPriceField.value).toBe('100');

    const saveButton = screen.getByText('Save');
    await user.click(saveButton);

    await waitFor(() =>
      expect(screen.getByText(/Invoice 1/i)).toBeInTheDocument(),
    );
  });
});
