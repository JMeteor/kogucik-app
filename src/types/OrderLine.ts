import { z } from 'zod';

export const OrderLineSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number().nullable(),
  unit: z.string(),
  tax: z.number().nullable(),
  price: z.number().nullable(),
});

export type OrderLine = z.infer<typeof OrderLineSchema>;
