import { type Invoice } from '../../../types/Invoice.ts';

export const sortInvoicesByCreationDate = (invoices: Invoice[]) => {
  return [...invoices].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return bTime - aTime;
  });
};
