import { Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetInvoice, useUpdateInvoice } from '../hooks/invoices.hooks.ts';
import { z } from 'zod';
import { InvoiceSchema } from '../types/Invoice.ts';

import { InvoiceForm } from '../components/InvoiceForm.tsx';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { Loader } from '../components/Loader.tsx';
import { useNotificationContext } from '../providers/NotificationProvider.tsx';

export const ViewInvoicePage = () => {
  const { t } = useTranslation();
  const { id } = z.object({ id: z.string() }).parse(useParams());
  const { data: invoice } = useGetInvoice(id);
  const navigate = useNavigate();
  const { setNotification } = useNotificationContext();

  const [searchParams] = useSearchParams();

  const isEditMode = searchParams.get('mode') === 'edit';

  const updateInvoiceMutation = useUpdateInvoice();

  const onSubmit = async (data: any) => {
    if (!isEditMode || !id) return;

    updateInvoiceMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          navigate(`/invoice/${id}`);
          setNotification({
            severity: 'success',
            title: <strong>Success</strong>,
            children: 'Invoice saved successfully.',
          });
        },
        onError: () => {
          setNotification({
            severity: 'error',
            title: 'Error',
            children: 'Something went wrong.',
          });
        },
      },
    );
  };

  return (
    <div>
      <header>
        <Box sx={{ m: 4 }}>
          <h1 style={visuallyHidden}>{t('ADD_INVOICE')}</h1>
        </Box>
      </header>

      {invoice ? (
        <InvoiceForm
          defaultValues={invoice}
          mode={isEditMode ? 'edit' : 'view'}
          resolver={InvoiceSchema}
          onSubmit={onSubmit}
          children={() => (
            <ViewInvoiceActions
              isEditMode={isEditMode}
              id={id}
              useMutation={updateInvoiceMutation}
            />
          )}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

interface ViewInvoiceActionsProps {
  isEditMode: boolean;
  id: string;
  useMutation: any;
}

const ViewInvoiceActions = ({
  isEditMode,
  id,
  useMutation,
}: ViewInvoiceActionsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Button
        variant="contained"
        color={isEditMode ? 'error' : 'secondary'}
        component={Link}
        to={isEditMode ? `/invoice/${id}` : `/invoice/${id}?mode=edit`}
      >
        {isEditMode ? (
          <>
            <Icon sx={{ mr: 1 }}>close</Icon>
            {t('LABELS.DISCARD')}
          </>
        ) : (
          <>
            <Icon sx={{ mr: 1 }}>edit</Icon>
            {t('LABELS.EDIT')}
          </>
        )}
      </Button>
      {isEditMode && (
        <Button color="secondary" variant="contained" type="submit">
          <Box display="flex">
            <Icon sx={{ mr: 1 }}>save</Icon>
            <span>
              {useMutation.isLoading ? t('LABELS.SAVING') : t('LABELS.SAVE')}
            </span>
          </Box>
        </Button>
      )}
    </>
  );
};
