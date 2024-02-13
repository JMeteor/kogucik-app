import { Box, Button, Grid, Icon, TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { StyledFieldset } from '../components/StyledFieldset.tsx';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { BillingForm } from '../components/BillingForm.tsx';
import { OrderLinesForm } from '../components/OrderLinesForm.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import InvoiceSchema from '../types/Invoice.ts';
import { useState } from 'react';

export default function ViewInvoice() {
  const { handleSubmit, register, control } = useForm({
    resolver: zodResolver(InvoiceSchema),
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const onSubmit = (data: any) => {
    console.log('Saving invoice...', data);
  };

  const handleEdit = () => {
    if (isEditMode) {
      console.log('Canceling edit...');
    } else {
      console.log('Editing invoice...');
    }
    setIsEditMode((prevState) => !prevState);
  };

  return (
    <div>
      <Box sx={{ m: 4 }}>
        <h1 style={visuallyHidden}>Invoice</h1>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item sm={6}>
            <StyledFieldset>
              <TextField
                {...register('invoiceNumber')}
                label="Invoice number"
                variant="standard"
                disabled
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
              <Button
                color={isEditMode ? 'error' : 'secondary'}
                variant="contained"
                onClick={() => handleEdit()}
              >
                {isEditMode ? (
                  <>
                    <Icon sx={{ mr: 1 }}>close</Icon>
                    Discard
                  </>
                ) : (
                  <>
                    <Icon sx={{ mr: 1 }}>edit</Icon>
                    Edit
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
