import {Invoice} from "../../../types/Invoice.ts";

export const sortInvoicesByCreationDate = (invoices: Invoice[]) => {
  return [...invoices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};
