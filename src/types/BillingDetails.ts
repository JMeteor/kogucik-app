import { z } from 'zod';

export const BillingDetailsSchema = z.object({
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
