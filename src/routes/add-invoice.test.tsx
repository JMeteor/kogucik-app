import { render } from './../test/test-utils.tsx';
import { it, expect, describe } from 'vitest';
import { AddInvoicePage } from './add-invoice';

describe('AddInvoicePage', () => {
  const { getByText, getByLabelText, getAllByLabelText } = render(
    <AddInvoicePage />,
  );

  describe('InvoiceForm', () => {
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
  });

  describe('BillingForm', () => {
    it('renders recipient title', async () => {
      expect(getByText('Recipient')).toBeInTheDocument();
    });

    it('renders sender title', async () => {
      expect(getByText('Sender')).toBeInTheDocument();
    });

    it('renders fields twice', () => {
      expect(getAllByLabelText('Company name')).toHaveLength(2);
      expect(getAllByLabelText('City')).toHaveLength(2);
      expect(getAllByLabelText('Street')).toHaveLength(2);
      expect(getAllByLabelText('Postcode')).toHaveLength(2);
      expect(getAllByLabelText('NIP')).toHaveLength(2);
      expect(getAllByLabelText('Phone')).toHaveLength(2);
      expect(getAllByLabelText('Email')).toHaveLength(2);
      expect(getAllByLabelText('Bank account')).toHaveLength(2);
    });
  });

  describe('OrderLinesForm', () => {
    it('renders "Add item" button', async () => {
      expect(getByText('Add item')).toBeInTheDocument();
    });
  });
});
