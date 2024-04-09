import { renderWithRouter } from './../test/test-utils.tsx';
import { it, expect, describe } from 'vitest';
import { AddInvoicePage } from './add-invoice';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('AddInvoicePage', () => {
  const user = userEvent.setup();
  const { getByRole, getByText, getByLabelText } = renderWithRouter(
    <AddInvoicePage />,
  );

  it('renders page title correctly', () => {
    const title = getByText(/Add Invoice/i);
    expect(title).toBeInTheDocument();
  });

  it('renders invoice form fields', () => {
    expect(getByLabelText('Name *')).toBeInTheDocument();
    expect(getByLabelText('Created')).toBeInTheDocument();
    expect(getByLabelText('Valid until')).toBeInTheDocument();
  });

  it('renders save button', async () => {
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('renders recipient title', async () => {
    expect(getByText('Recipient')).toBeInTheDocument();
  });

  it('renders recipient form fields', () => {
    const recipientForm = getByRole('group', { name: 'Recipient' });
    expect(
      within(recipientForm).getByLabelText('Company name'),
    ).toBeInTheDocument();
    expect(within(recipientForm).getByLabelText('City')).toBeInTheDocument();
    expect(within(recipientForm).getByLabelText('Street')).toBeInTheDocument();
    expect(
      within(recipientForm).getByLabelText('Postcode'),
    ).toBeInTheDocument();
    expect(within(recipientForm).getByLabelText('NIP')).toBeInTheDocument();
    expect(within(recipientForm).getByLabelText('Phone')).toBeInTheDocument();
    expect(within(recipientForm).getByLabelText('Email')).toBeInTheDocument();
    expect(
      within(recipientForm).getByLabelText('Bank account'),
    ).toBeInTheDocument();
  });

  it('renders `Add item` button', async () => {
    expect(getByText('Add item')).toBeInTheDocument();
  });

  // it('adds new item on `Add item` click', async () => {
  //   const addItemButton = getByText('Add item');
  //   await user.click(addItemButton);
  //
  //   const orderItemForm = getByRole('group', { name: 'Items' });
  //
  //   expect(within(orderItemForm).getByLabelText('Name')).toBeInTheDocument();
  //   expect(within(orderItemForm).getByLabelText('Amount')).toBeInTheDocument();
  //   expect(within(orderItemForm).getByLabelText('Unit')).toBeInTheDocument();
  //   expect(within(orderItemForm).getByLabelText('Tax')).toBeInTheDocument();
  //   expect(within(orderItemForm).getByLabelText('Price')).toBeInTheDocument();
  //   expect(within(orderItemForm).getByLabelText('Delete')).toBeInTheDocument();
  // });

  it('fills in the form', async () => {
    const nameField = getByLabelText('Name *') as HTMLInputElement;
    await user.type(nameField, 'Test');

    const createdField = getByLabelText('Created') as HTMLInputElement;
    await user.type(createdField, '04/09/2024');

    // TODO: why RangeError: Invalid time value?
    // const validField = getByLabelText('Valid until') as HTMLInputElement;
    // await user.type(validField, '04/09/2024');

    const recipientForm = getByRole('group', { name: 'Recipient' });

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

    expect(nameField.value).toBe('Test');
    expect(createdField.value).toBe('04/09/2024');
    // expect(validField.value).toBe('04/23/2024');
    expect(recipientCompanyNameField.value).toBe('Test');
    expect(recipientCityField.value).toBe('Testopolis');
    expect(recipientStreetField.value).toBe('Test St.');
    expect(recipientPostcodeField.value).toBe('12345');
    expect(recipientNipField.value).toBe('1234567890');
    expect(recipientPhoneField.value).toBe('1234567890');
    expect(recipientEmailField.value).toBe('john.doe@email.com');
    expect(recipientBankAccountField.value).toBe(
      'PL27109024026154175215614473',
    );

    const addItemButton = getByText('Add item');
    await user.click(addItemButton);

    const orderItemForm = getByRole('group', { name: 'Items' });

    const orderItemNameField = within(orderItemForm).getByLabelText(
      'Name',
    ) as HTMLInputElement;
    await user.type(orderItemNameField, 'Test');

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

    expect(orderItemNameField.value).toBe('Test');
    expect(orderItemAmountField.value).toBe('1');
    expect(orderItemUnitField.value).toBe('Test');
    expect(orderItemTaxField.value).toBe('23');
    expect(orderItemPriceField.value).toBe('100');

    const saveButton = getByText('Save');
    await user.click(saveButton);

    expect(window.location.pathname).toMatch(/\/invoice\/\d+/);
  });
});
