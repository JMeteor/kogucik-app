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
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

export default function ViewInvoice() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { handleSubmit, register, control, setValue } = useForm({
    resolver: zodResolver(InvoiceSchema),
  });
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle');
  const [isEditMode, setIsEditMode] = useState(false);

  if (!id) {
    throw new Error('Invoice id is not defined');
  }

  const { data: invoice, refetch } = useQuery(
    ['invoice', id],
    () => InvoicesService.fetchInvoiceById(id),
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [id, refetch]);

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
    handleSubmit(onSubmit); // WHY NO WORK ?!?!
  };

  const handleEdit = () => {
    if (isEditMode) {
      console.log('Canceling edit...');
      navigate(`/invoice/${id}`);
    } else {
      navigate(`/invoice/${id}/edit`);
      console.log('Editing invoice...');
    }
    setIsEditMode((prevState) => !prevState);
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
              <Button
                color={isEditMode ? 'error' : 'secondary'}
                variant="contained"
                onClick={handleEdit}
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
