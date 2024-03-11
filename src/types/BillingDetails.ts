import { z } from 'zod';

export const BillingDetailsSchema = z.object({
  companyName: z.string(),
  city: z.string(),
  street: z.string(),
  postcode: z.string({ required_error: 'Postcode is required' }),
  nip: z.string().refine(nip => nip.length === 10, {
    message: 'NIP must be 10 characters long',
  }),
  phone: z.string(),
  email: z.string(),
  bankAccount: z.string(),
});

export type BillingDetails = z.infer<typeof BillingDetailsSchema>;
