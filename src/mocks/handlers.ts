import { http, HttpResponse } from 'msw';
import { Invoice } from '../types/Invoice.ts';
import { mockInvoice } from './invoice.mock.ts';

const API_URL = 'http://localhost:4000/api';

const allInvoices = new Map();

allInvoices.set(mockInvoice.id, mockInvoice);

export const handlers = [
  http.get(`${API_URL}/invoices`, () => {
    // console.log('Captured a "GET /invoices" request');
    return HttpResponse.json(Array.from(allInvoices.values()));
  }),

  http.get(`${API_URL}/invoices/:id`, ({ params }) => {
    // console.log(`Captured a "GET /invoices/${params.id}" request`);

    const invoice = allInvoices.get(params.id);

    if (invoice) {
      return HttpResponse.json(invoice, { status: 200 });
    } else {
      return HttpResponse.json(null, { status: 404 });
    }
  }),

  http.post(`${API_URL}/invoices`, async ({ request }) => {
    // console.log('Captured a "POST /invoices" request');
    const newInvoice = await request.json();
    allInvoices.set((newInvoice as Invoice).id, newInvoice);

    return HttpResponse.json(newInvoice, { status: 201 });
  }),

  http.put(`${API_URL}/invoices/:id`, async ({ params, request }) => {
    // console.log(`Captured a "PUT /invoices/${params.id}" request`);
    const updatedInvoice = await request.json();

    if (updatedInvoice) {
      allInvoices.set(params.id, updatedInvoice);
      return HttpResponse.json(updatedInvoice, { status: 200 });
    } else {
      return HttpResponse.json(null, { status: 404 });
    }
  }),

  http.delete(`${API_URL}/invoices/:id`, ({ params }) => {
    // console.log(`Captured a "DELETE /invoices/${params.id}" request`);

    const deletedInvoice = allInvoices.get(params.id);

    if (!deletedInvoice) {
      return new HttpResponse(null, { status: 404 });
    }

    allInvoices.delete(params.id);

    return HttpResponse.json(deletedInvoice, { status: 200 });
  }),
];
