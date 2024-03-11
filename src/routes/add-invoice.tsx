import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InvoiceSchema from '../types/Invoice.ts';

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
import dayjs from 'dayjs';

import { useTranslation } from 'react-i18next';
import { BillingForm } from '../components/BillingForm.tsx';
import { OrderLinesForm } from '../components/OrderLinesForm.tsx';
import { StyledFieldset } from '../components/StyledFieldset.tsx';
import { generateUniqueId } from '../helpers/generateId.ts';
import { useCreateInvoice } from '../hooks/invoices.hooks.ts';

export default function AddInvoicePage() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(InvoiceSchema),
    mode: 'onChange',
  });

  const todayDate = dayjs(new Date());

  const createInvoiceMutation = useCreateInvoice();

  console.log(errors);

  const onSubmit = async (data: any) => {
    const id = generateUniqueId();

    console.log('Form data before transformation:', data);

    const invoice = {
      ...data,
      id,
      createdAt: dayjs(data.createdAt).toISOString(),
      validUntil: dayjs(data.createdAt).toISOString(),
    };

    console.log('Transformed form data:', invoice);

    createInvoiceMutation.mutate(invoice, {
      onSuccess: () => {
        reset();
      },
      onError: () => {},
    });
  };

  return (
    <div>
      <Box sx={{ m: 4 }}>
        <h1 style={visuallyHidden}>{t('ADD_INVOICE')}</h1>
      </Box>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item sm={6}>
            <StyledFieldset>
              <TextField
                {...register('name')}
                label={t('INVOICE.NAME')}
                variant="standard"
                required
                fullWidth
                error={!!errors.name}
              />

              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="column">
                    <Controller
                      name="createdAt"
                      control={control}
                      defaultValue={todayDate}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          format={'DD/MM/YYYY'}
                          label={t('INVOICE.CREATED')}
                          onChange={(date: Date | null) => {
                            field.onChange(date ? dayjs(date).toDate() : null);
                          }}
                          sx={{ mb: 1 }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="column">
                    <Controller
                      name="validUntil"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          format={'DD/MM/YYYY'}
                          label={t('INVOICE.VALID_UNTIL')}
                          onChange={(date: Date | null) => {
                            field.onChange(date ? dayjs(date).toDate() : null);
                          }}
                          sx={{ mb: 1 }}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {errors.validUntil && <span>This field is required</span>}
                  </Box>
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
                    {createInvoiceMutation.isLoading
                      ? t('LABELS.SAVING')
                      : t('LABELS.SAVE')}
                  </span>
                </Box>
              </Button>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to="/"
              >
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
              {createInvoiceMutation.isSuccess && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Invoice saved successfully.
                </Alert>
              )}
              {createInvoiceMutation.isError && (
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
