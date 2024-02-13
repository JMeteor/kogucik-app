import { z } from 'zod';
import BillingDetails from './BillingDetails';
import OrderLine from './OrderLine.ts';

const InvoiceSchema = z.object({
  invoiceNumber: z.string(),
  createDate: z.date().nullable(),
  dueDate: z.date().nullable(),
  recipient: BillingDetails.nullable(),
  sender: BillingDetails.nullable(),
  items: z.array(OrderLine),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
export default InvoiceSchema;
