import { z } from 'zod';
import { OrderLineSchema } from './OrderLine.ts';
import { BillingDetailsSchema } from './BillingDetails.ts';

export const InvoiceSchema = z.object({
  id: z.string().optional(),
  recipient: BillingDetailsSchema,
  sender: BillingDetailsSchema,
  items: z.array(OrderLineSchema),
  name: z.string().min(1, 'Name is required'),
  createdAt: z.date().nullable(),
  validUntil: z.date().nullable(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
