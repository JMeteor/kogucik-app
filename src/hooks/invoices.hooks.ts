import { useMutation, useQuery } from 'react-query';
import InvoicesService from '../services/invoices/invoicesService.ts';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../services/invoices/types';

const INVOICE_KEY = 'invoice';

export const useGetInvoices = async () => {
  useQuery({
    queryKey: [INVOICE_KEY],
    queryFn: async () => InvoicesService.fetchAllInvoices(),
  });
};

export const useGetInvoice = (id: string) =>
  useQuery({
    queryKey: [INVOICE_KEY, id],
    queryFn: async () => InvoicesService.fetchInvoiceById(id),
  });

export const useCreateInvoice = () =>
  useMutation(async (data: CreateInvoiceDto) =>
    InvoicesService.createInvoice(data),
  );

export const useUpdateInvoice = () =>
  useMutation(async ({ id, data }: { id: string; data: UpdateInvoiceDto }) =>
    InvoicesService.updateInvoice(id, data),
  );

export const useDeleteInvoice = () =>
  useMutation(async (id: string) => InvoicesService.deleteInvoice(id));
