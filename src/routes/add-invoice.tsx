import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { DatePicker } from '@mui/x-date-pickers';
import { BillingForm } from '../components/BillingForm.tsx';
import { OrderLinesForm } from '../components/OrderLinesForm.tsx';
import { StyledFieldset } from '../components/StyledFieldset.tsx';
import InvoiceSchema from '../types/Invoice.ts';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import InvoicesService from '../services/invoices/invoicesService.ts';
import { generateUniqueId } from '../helpers/generateId.ts';
import dayjs from 'dayjs';

export default function AddInvoice() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(InvoiceSchema),
  });

  // idle, loading, success, error
  const [status, setStatus] = useState('idle');

  console.log(errors);

  const onSubmit = async (data: any) => {
    const id = generateUniqueId();
    const invoice = { ...data, id };

    setStatus('loading');
    console.log('Saving invoice...', invoice);

    try {
      await InvoicesService.createInvoice(invoice);
      setStatus('success');
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  return (
    <div>
      <Box sx={{ m: 4 }}>
        <h1 style={visuallyHidden}>{t('ADD_INVOICE')}</h1>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item sm={6}>
            <StyledFieldset>
              <TextField
                {...register('name')}
                label={t('INVOICE.NAME')}
                variant="standard"
                required
                fullWidth
              />

              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="createdAt"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label={t('INVOICE.CREATED')}
                        onChange={(date: Date | null) => {
                          field.onChange(
                            date ? dayjs(date).format('YYYY-MM-DD') : null,
                          );
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="validUntil"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label={t('INVOICE.VALID_UNTIL')}
                        onChange={(date: Date | null) => {
                          field.onChange(
                            date ? dayjs(date).format('YYYY-MM-DD') : null,
                          );
                        }}
                      />
                    )}
                    rules={{ required: true }}
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
              <Button color="secondary" variant="contained" type="submit">
                <Box display="flex">
                  <Icon sx={{ mr: 1 }}>save</Icon>
                  <span>
                    {status === 'loading'
                      ? t('LABELS.SAVING')
                      : t('LABELS.SAVE')}
                  </span>
                </Box>
              </Button>
              <Button color="secondary" variant="contained" href="/">
                <span>{t('LABELS.CANCEL')}</span>
              </Button>
            </Box>
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              {status === 'success' && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Invoice saved successfully.
                </Alert>
              )}
              {status === 'error' && (
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
              isEditMode={true}
              errors={errors}
            />
          </Grid>

          <Grid item sm={6}>
            <BillingForm
              name={'sender'}
              register={register}
              isEditMode={true}
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
            isEditMode={true}
          />
        </Box>
      </form>
    </div>
  );
}
