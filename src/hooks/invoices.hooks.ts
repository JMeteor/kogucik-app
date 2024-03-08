import { useMutation, useQuery } from 'react-query';
import InvoicesService from '../services/invoices/invoicesService.ts';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../services/invoices/types';

const INVOICE_KEY = 'invoice';

export const useGetInvoices = () => {
  useQuery({
    queryKey: [INVOICE_KEY],
    queryFn: () => InvoicesService.fetchAllInvoices(),
  });
};

export const useGetInvoice = (id: string) =>
  useQuery({
    queryKey: [INVOICE_KEY, id],
    queryFn: () => InvoicesService.fetchInvoiceById(id),
  });

export const useCreateInvoice = () =>
  useMutation((data: CreateInvoiceDto) => InvoicesService.createInvoice(data));

export const useUpdateInvoice = () =>
  useMutation(({ id, data }: { id: string; data: UpdateInvoiceDto }) =>
    InvoicesService.updateInvoice(id, data),
  );

export const useDeleteInvoice = () =>
  useMutation((id: string) => InvoicesService.deleteInvoice(id));
