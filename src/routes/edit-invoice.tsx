import { Box, Button, Grid, Icon, TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { StyledFieldset } from '../components/StyledFieldset.tsx';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { BillingForm } from '../components/BillingForm.tsx';
import { OrderLinesForm } from '../components/OrderLinesForm.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Link, useMatch, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetInvoice, useUpdateInvoice } from '../hooks/invoices.hooks.ts';
import { z } from 'zod';
import InvoiceSchema from '../types/Invoice.ts';

interface ViewInvoiceProps {
  defaultValues?: any;
  isEditMode?: boolean;
}

const useIsEditMode = () => {
  const match = useMatch('/invoice/:id/edit');
  return Boolean(match);
};

const EditInvoicePage = () => {
  const isEditMode = useIsEditMode();
  const { id } = z
    .object({ id: z.string() })
    .parse(useParams<{ id: string }>());

  const { data: invoice, status } = useGetInvoice(id);

  if (!id) {
    throw new Error('Invoice id is not defined');
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error...</div>;
  }

  return <ViewInvoice defaultValues={invoice} isEditMode={isEditMode} />;
};

function ViewInvoice({ defaultValues, isEditMode = false }: ViewInvoiceProps) {
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

  const [status, setStatus] = useState('idle');
  const updateInvoiceMutation = useUpdateInvoice();

  const onSubmit = async (data: any) => {
    console.log('Sending new data...', data);
    if (!isEditMode || !id) return;

    setStatus('loading');

    try {
      await updateInvoiceMutation.mutateAsync({ id, data });
      setStatus('success');
    } catch (error) {
      console.log('error');
      setStatus('error');
    }
  };

  return (
    <div>
      <Box sx={{ m: 4 }}>
        <h1 style={visuallyHidden}>{t('INVOICE.TITLE')}</h1>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
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
                    defaultValue={null}
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
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker {...field} label={t('INVOICE.VALID_UNTIL')} />
                    )}
                  />
                </Grid>
              </Grid>
            </StyledFieldset>
          </Grid>
          <Grid item sm={6}>
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDirection="row-reverse"
              gap={1}
            >
              <Button
                disabled={!isEditMode}
                color="secondary"
                variant="contained"
                type="submit"
              >
                <Box display="flex">
                  <Icon sx={{ mr: 1 }}>save</Icon>
                  <span>
                    {status === 'loading'
                      ? t('LABELS.SAVING')
                      : t('LABELS.SAVE')}
                  </span>
                </Box>
              </Button>
              <Button color={isEditMode ? 'error' : 'secondary'}>
                <Link
                  to={isEditMode ? `/invoice/${id}` : `/invoice/${id}/edit`}
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
                </Link>
              </Button>
            </Box>
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
          />
        </Box>
      </form>
    </div>
  );
}

export default EditInvoicePage;
