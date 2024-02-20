import { z } from 'zod';

const BillingDetailsSchema = z.object({
  companyName: z.string(),
  city: z.string(),
  street: z.string(),
  postcode: z.string(),
  nip: z.string(),
  phone: z.string(),
  email: z.string(),
  bankAccount: z.string(),
});

export type BillingDetails = z.infer<typeof BillingDetailsSchema>;
export default BillingDetailsSchema;
