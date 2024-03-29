import { z } from 'zod';
import { OrderLineSchema } from './OrderLine.ts';
import { BillingDetailsSchema } from './BillingDetails.ts';

export const NewInvoiceSchema = z.object({
  id: z.string().optional(),
  recipient: BillingDetailsSchema.optional(),
  sender: BillingDetailsSchema.optional(),
  items: z.array(OrderLineSchema),
  name: z.string().min(1, 'Name is required'),
  createdAt: z.string().nullable(),
  validUntil: z.string().nullable(),
});

export type NewInvoice = z.infer<typeof NewInvoiceSchema>;
