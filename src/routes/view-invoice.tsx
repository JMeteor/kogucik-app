import { Box, Button, Grid, Icon, TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { StyledFieldset } from '../components/StyledFieldset.tsx';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { BillingForm } from '../components/BillingForm.tsx';
import { OrderLinesForm } from '../components/OrderLinesForm.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import InvoiceSchema from '../types/Invoice.ts';
import InvoicesService from '../services/invoices/invoicesService.ts';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface ViewInvoiceProps {
  isEditMode?: boolean;
}

export default function ViewInvoice({ isEditMode = false }: ViewInvoiceProps) {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { handleSubmit, register, control, setValue } = useForm({
    resolver: zodResolver(InvoiceSchema),
  });

  const [status, setStatus] = useState('idle');

  // This Can be validated on L19 with zod
  if (!id) {
    throw new Error('Invoice id is not defined');
  }

  // Why refetch?
  const { data: invoice } = useQuery(
      ['invoice', id],
      () => InvoicesService.fetchInvoiceById(id)
  );


  // Try to avoid useEffect as much as possible. Separate data fetching component from form component
  // Then use form in both, add-invoice and edit invoice
  useEffect(() => {
    if (invoice) {
      setValue('invoiceNumber', invoice.id);
      setValue('createDate', dayjs(invoice.createdAt));
      setValue('dueDate', dayjs(invoice.validUntil));
      setValue('recipient', invoice.recipient);
      setValue('sender', invoice.sender);
      setValue('items', invoice.items);
    }
  }, [invoice, setValue]);

  // useMutation + types
  const onSubmit = async (data: any) => {
    console.log('Sending new data...', data);
    if (!isEditMode || !id) return;

    setStatus('loading');

    try {
      await InvoicesService.updateInvoice(id, data);
      setStatus('success');
    } catch (error) {
      console.log('error');
      setStatus('error');
    }
  };

  const handleSave = () => {
    console.log('Saving invoice...');
    // export type UseFormHandleSubmit<TFieldValues extends FieldValues, TTransformedValues extends FieldValues | undefined = undefined> = (onValid: TTransformedValues extends undefined ? SubmitHandler<TFieldValues> : TTransformedValues extends FieldValues ? SubmitHandler<TTransformedValues> : never, onInvalid?: SubmitErrorHandler<TFieldValues>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    // handleSubmit returns a function
    handleSubmit(onSubmit); // WHY NO WORK ?!?!
  };

  return (
    <div>
      <Box sx={{ m: 4 }}>
        <h1 style={visuallyHidden}>{t('INVOICE.TITLE')}</h1>
      </Box>

      <form>
        <Grid container spacing={6}>
          <Grid item sm={6}>
            <StyledFieldset>
              <TextField
                {...register('invoiceNumber')}
                label={t('INVOICE.NUMBER')}
                variant="standard"
                disabled
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
              {/* Should be handled as form submission */}
              <Button
                disabled={!isEditMode}
                color="secondary"
                variant="contained"
                onClick={handleSave}
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
              <Link
                color={isEditMode ? 'error' : 'secondary'}
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
            </Box>
          </Grid>

          <Grid item sm={6}>
            <BillingForm
              name={'recipient'}
              register={register}
              isEditMode={isEditMode}
            />
          </Grid>

          <Grid item sm={6}>
            <BillingForm
              name={'sender'}
              register={register}
              isEditMode={isEditMode}
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
