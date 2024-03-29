import { z } from 'zod';
import { OrderLineSchema } from './OrderLine.ts';
import { BillingDetailsSchema } from './BillingDetails.ts';

export const InvoiceSchema = z.object({
  id: z.string(),
  recipient: BillingDetailsSchema.optional(),
  sender: BillingDetailsSchema.optional(),
  items: z.array(OrderLineSchema),
  name: z.string(),
  createdAt: z.string(),
  validUntil: z.string(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
