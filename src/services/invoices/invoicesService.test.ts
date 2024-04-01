import { test, expect, describe, beforeAll, afterEach, afterAll } from 'vitest';
import InvoicesService from './invoicesService.ts';
import { server } from '../../mocks/server.ts';
import { mockInvoice } from '../../mocks/invoice.mock.ts';

const MOCK_INVOICE = mockInvoice;

describe('invoicesService', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('fetchAllInvoices', () => {
    test('returns invoices data when invoice exists', async () => {
      const data = await InvoicesService.fetchAllInvoices();

      expect(data).toEqual([MOCK_INVOICE]);
    });
  });

  describe('fetchInvoiceById', () => {
    test('returns invoice data when invoice exists', async () => {
      const data = await InvoicesService.fetchInvoiceById('1');

      expect(data).toEqual(MOCK_INVOICE);
    });
    test('throws an error when the invoice does not exist', async () => {
      const invoiceId = '2';

      await expect(InvoicesService.fetchInvoiceById(invoiceId)).rejects.toThrow(
        'Network response was not ok',
      );
    });
  });

  describe('createInvoice', () => {
    test('returns created invoice data', async () => {
      const data = {
        name: 'Invoice 3',
        amount: 300,
      };
      const invoice = await InvoicesService.createInvoice(data);

      expect(invoice).toEqual({
        id: '3',
        name: 'Invoice 3',
        amount: 300,
      });
    });
  });

  describe('updateInvoice', () => {
    test('returns updated invoice data', async () => {
      const data = {
        ...MOCK_INVOICE,
        name: 'Invoice 2',
      };

      //TODO: How to mock updated invoice data?
      const invoice = await InvoicesService.updateInvoice('1', data);

      expect(invoice).toEqual({
        ...MOCK_INVOICE,
        name: 'Invoice 2',
      });
    });

    test('throws an error when the invoice does not exist', async () => {
      const invoiceId = '2';
      const data = {
        ...MOCK_INVOICE,
        name: 'Invoice 2',
      };

      await expect(
        InvoicesService.updateInvoice(invoiceId, data),
      ).rejects.toThrow('Network response was not ok');
    });
  });

  describe('deleteInvoice', () => {
    test('deletes the invoice', async () => {
      //TODO: How to test deleting an invoice?
      const response = await InvoicesService.deleteInvoice('1');
      console.log(response);
    });

    test('throws an error when the invoice does not exist', async () => {
      const invoiceId = '2';

      await expect(InvoicesService.deleteInvoice(invoiceId)).rejects.toThrow(
        'Network response was not ok',
      );
    });
  });
});
