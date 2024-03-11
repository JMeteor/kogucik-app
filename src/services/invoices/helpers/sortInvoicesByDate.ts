import { GetAllInvoicesDto } from '../types';

export const sortInvoicesByCreationDate = (invoices: GetAllInvoicesDto[]) => {
  return [...invoices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};
