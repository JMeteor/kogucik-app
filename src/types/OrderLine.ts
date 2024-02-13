import { z } from 'zod';

const OrderLineSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  unit: z.string(),
  tax: z.number(),
  price: z.number(),
});

export type OrderLine = z.infer<typeof OrderLineSchema>;
export default OrderLineSchema;
