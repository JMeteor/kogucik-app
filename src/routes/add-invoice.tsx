import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, Grid, Icon, TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { DatePicker } from '@mui/x-date-pickers';
import { BillingForm } from '../components/BillingForm.tsx';
import { OrderLinesForm } from '../components/OrderLinesForm.tsx';
import { StyledFieldset } from '../components/StyledFieldset.tsx';
import InvoiceSchema from '../types/Invoice.ts';

export default function AddInvoice() {
  const { handleSubmit, register, control } = useForm({
    resolver: zodResolver(InvoiceSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Saving invoice...', data);
  };

  return (
    <div>
      <Box sx={{ m: 4 }}>
        <h1 style={visuallyHidden}>Add new invoice</h1>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item sm={6}>
            <StyledFieldset>
              <TextField
                {...register('invoiceNumber')}
                label="Invoice number"
                variant="standard"
                fullWidth
              />

              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="createDate"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker {...field} label={'Create date'} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="dueDate"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker {...field} label={'Valid until date'} />
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
              <Button color="secondary" variant="contained" type="submit">
                <Box display="flex">
                  <Icon sx={{ mr: 1 }}>save</Icon>
                  <span>Save</span>
                </Box>
              </Button>
              <Button color="secondary" variant="contained">
                Cancel
              </Button>
            </Box>
          </Grid>

          <Grid item sm={6}>
            <BillingForm
              name={'recipient'}
              register={register}
              isEditMode={true}
            />
          </Grid>

          <Grid item sm={6}>
            <BillingForm
              name={'sender'}
              register={register}
              isEditMode={true}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
          }}
        >
          <OrderLinesForm control={control} register={register} />
        </Box>
      </form>
    </div>
  );
}
