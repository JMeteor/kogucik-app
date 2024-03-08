import { z } from 'zod';
import OrderLineSchema from './OrderLine.ts';
import BillingDetails from './BillingDetails.ts';

const InvoiceSchema = z.object({
  id: z.string().optional(),
  recipient: BillingDetails,
  sender: BillingDetails,
  items: z.array(OrderLineSchema),
  name: z.string(),
  createdAt: z.string(),
  validUntil: z.string(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
export default InvoiceSchema;
