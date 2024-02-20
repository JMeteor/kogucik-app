// @tanstack/react-query should be used :)
import { useMutation, useQuery, useQueryClient } from 'react-query';
import InvoicesService from './services/invoices/invoicesService.ts';
import UpdateInvoiceDto from './services/invoices/types/UpdateInvoiceDto.ts';

const INVOICE_KEY = 'invoice';

export const useGetInvoice = (id: string) =>
  useQuery({
    queryKey: [INVOICE_KEY, id],
    queryFn: () => InvoicesService.fetchInvoiceById(id),
  });

export const useGetInvoices = () =>
  useQuery([INVOICE_KEY], () => InvoicesService.fetchAllInvoices());

export const useEditInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoice: UpdateInvoiceDto & { id: string }) =>
      InvoicesService.updateInvoice(invoice.id, invoice),
    onSuccess: () => queryClient.invalidateQueries(INVOICE_KEY),
  });
};
