import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Box, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { BillingForm } from './BillingForm.tsx';
import { OrderLinesForm } from './OrderLinesForm.tsx';
import { StyledFieldset } from './StyledFieldset.tsx';
import { ReactNode } from 'react';

export interface InvoiceFormProps {
  children?: (form: any) => ReactNode;
  defaultValues?: any;
  mode: 'view' | 'edit';
  resolver: any;
  onSubmit: SubmitHandler<any>;
}

export const InvoiceForm = ({
  children,
  defaultValues,
  mode,
  resolver,
  onSubmit,
}: InvoiceFormProps) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(resolver),
  });

  const isEditMode = mode === 'edit';

  return (
    <>
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
              {children && children({ handleSubmit })}
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
            errors={errors}
          />
        </Box>
      </form>
    </>
  );
};
