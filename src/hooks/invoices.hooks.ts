import { useMutation, useQuery, useQueryClient } from 'react-query';
import InvoicesService from '../services/invoices/invoicesService.ts';

const INVOICE_KEY = 'invoice';

export const useGetInvoices = () =>
  useQuery({
    queryKey: [INVOICE_KEY],
    queryFn: () => InvoicesService.fetchAllInvoices(),
  });

export const useGetInvoice = (id: string) =>
  useQuery({
    queryKey: [INVOICE_KEY, id],
    queryFn: () => InvoicesService.fetchInvoiceById(id),
  });

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => InvoicesService.createInvoice(data), {
    onSuccess: () => queryClient.invalidateQueries([INVOICE_KEY]),
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: any }) =>
      InvoicesService.updateInvoice(id, data),
    {
      onSuccess: () => queryClient.invalidateQueries([INVOICE_KEY]),
    },
  );
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => InvoicesService.deleteInvoice(id), {
    onSuccess: () => queryClient.invalidateQueries([INVOICE_KEY]),
  });
};
