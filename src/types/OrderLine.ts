import { z } from 'zod';

const OrderLineSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  unit: z.string(),
  tax: z.number(),
  price: z.number(),
});

export type OrderLine = z.infer<typeof OrderLineSchema>;
export default OrderLineSchema;
