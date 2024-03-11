import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Icon,
  TextField,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { StyledFieldset } from '../components/StyledFieldset.tsx';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { BillingForm } from '../components/BillingForm.tsx';
import { OrderLinesForm } from '../components/OrderLinesForm.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetInvoice, useUpdateInvoice } from '../hooks/invoices.hooks.ts';
import { z } from 'zod';
import { InvoiceSchema } from '../types/Invoice.ts';

const ViewInvoicePage = () => {
  const { id } = z.object({ id: z.string() }).parse(useParams());
  const { data: invoice, status } = useGetInvoice(id);

  const [searchParams] = useSearchParams();

  const isEditMode = searchParams.get('mode') === 'edit';

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error...</div>;
  }

  return <ViewInvoiceForm defaultValues={invoice} isEditMode={isEditMode} />;
};

interface InvoiceFormProps {
  defaultValues?: any;
  isEditMode: boolean;
}

function ViewInvoiceForm({ defaultValues, isEditMode }: InvoiceFormProps) {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(InvoiceSchema),
    defaultValues,
  });

  const updateInvoiceMutation = useUpdateInvoice();

  const onSubmit = async (data: any) => {
    if (!isEditMode || !id) return;

    await updateInvoiceMutation.mutateAsync(
      { id, data },
      {
        onSuccess: () => {},
        onError: () => {},
      },
    );
  };

  return (
    <div>
      <Box sx={{ m: 4 }}>
        <h1 style={visuallyHidden}>{t('INVOICE.TITLE')}</h1>
      </Box>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item sm={6}>
            <StyledFieldset>
              <TextField
                {...register('name')}
                disabled={!isEditMode}
                label={t('INVOICE.NAME')}
                variant="standard"
                required
                fullWidth
              />

              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    disabled={!isEditMode}
                    name="createDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker {...field} label={t('INVOICE.CREATED')} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    disabled={!isEditMode}
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker {...field} label={t('INVOICE.VALID_UNTIL')} />
                    )}
                  />
                </Grid>
              </Grid>
            </StyledFieldset>
          </Grid>
          <Grid item sm={6}>
            <Box display="flex" justifyContent="flex-end" gap={1}>
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
                      {updateInvoiceMutation.isLoading
                        ? t('LABELS.SAVING')
                        : t('LABELS.SAVE')}
                    </span>
                  </Box>
                </Button>
              )}
            </Box>
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              {updateInvoiceMutation.isSuccess && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Invoice saved successfully.
                </Alert>
              )}
              {updateInvoiceMutation.isError && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Something went wrong.
                </Alert>
              )}
            </div>
          </Grid>

          <Grid item sm={6}>
            <BillingForm
              name={'recipient'}
              register={register}
              isEditMode={isEditMode}
              errors={errors}
            />
          </Grid>

          <Grid item sm={6}>
            <BillingForm
              name={'sender'}
              register={register}
              isEditMode={isEditMode}
              errors={errors}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
          }}
        >
          <OrderLinesForm
            control={control}
            register={register}
            isEditMode={isEditMode}
            errors={errors}
          />
        </Box>
      </form>
    </div>
  );
}

export default ViewInvoicePage;
