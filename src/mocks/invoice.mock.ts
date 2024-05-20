import { Invoice } from '../types/Invoice.ts';

export const mockInvoice: Invoice = {
  id: '1',
  recipient: {
    companyName: 'John Doe',
    city: 'Springfield',
    street: '1234 Elm St.',
    postcode: '62701',
    nip: '0987654321',
    phone: '0987654321',
    email: 'john@doe.com',
    bankAccount: '',
  },
  sender: {
    companyName: 'Jane Doe',
    city: 'Springfield',
    street: '5678 Oak St.',
    postcode: '62701',
    nip: '1234567890',
    phone: '123456789',
    email: 'jane@doe.com',
    bankAccount: '',
  },
  items: [
    {
      id: '1',
      name: 'Item 1',
      amount: 100,
      unit: 'pcs',
      tax: 23,
      price: '100',
    },
  ],
  name: 'Invoice 1',
  createdAt: '2021-01-01',
  validUntil: '2021-02-01',
};
