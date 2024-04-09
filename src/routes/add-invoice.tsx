import { Box } from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import { parseISO } from 'date-fns';

import { useTranslation } from 'react-i18next';
import { generateUniqueId } from '../helpers/generateId.ts';
import { useCreateInvoice } from '../hooks/invoices.hooks.ts';

import { type NewInvoice, NewInvoiceSchema } from '../types/NewInvoice.ts';
import { type BillingDetails } from '../types/BillingDetails.ts';
import { InvoiceForm } from '../components/InvoiceForm.tsx';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useNavigate } from 'react-router-dom';

const todayDate = new Date().toISOString();

const billingEmptyValues: BillingDetails = {
  companyName: '',
  city: '',
  street: '',
  postcode: '',
  nip: '',
  phone: '',
  email: '',
  bankAccount: '',
};

const invoiceEmptyValues: NewInvoice = {
  id: undefined,
  recipient: billingEmptyValues,
  sender: billingEmptyValues,
  items: [],
  name: '',
  createdAt: todayDate,
  validUntil: null,
};

export const AddInvoicePage = () => {
  const { t } = useTranslation();
  const createInvoiceMutation = useCreateInvoice();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const id = generateUniqueId();

    const invoice = {
      ...data,
      id,
      createdAt: parseISO(data.createdAt),
      validUntil: parseISO(data.validUntil),
    };

    createInvoiceMutation.mutate(invoice, {
      onSuccess: () => {
        navigate(`/invoice/${invoice.id}`);
      },
      onError: () => {},
    });
  };

  return (
    <div>
      <Box sx={{ m: 4 }}>
        <h1 style={visuallyHidden}>{t('ADD_INVOICE')}</h1>
      </Box>

      <InvoiceForm
        defaultValues={invoiceEmptyValues}
        mode="edit"
        resolver={NewInvoiceSchema}
        onSubmit={onSubmit}
        children={() => (
          <AddInvoiceActions useMutation={createInvoiceMutation} />
        )}
      />
    </div>
  );
};

const AddInvoiceActions = ({ useMutation }: any) => {
  const { t } = useTranslation();

  return (
    <Button color="secondary" variant="contained" type="submit">
      <Box display="flex">
        <Icon sx={{ mr: 1 }}>save</Icon>
        <span>
          {useMutation.isLoading ? t('LABELS.SAVING') : t('LABELS.SAVE')}
        </span>
      </Box>
    </Button>
  );
};
