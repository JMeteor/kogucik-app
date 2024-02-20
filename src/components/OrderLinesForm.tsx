import { visuallyHidden } from '@mui/utils';
import { Box, Button, Icon, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { OrderLinesRow } from './OrderLinesRow.tsx';
import { StyledFieldset } from './StyledFieldset.tsx';

interface OrderLinesFormProps {
  control: ReturnType<typeof useForm>['control'];
  isEditMode?: boolean;
  register: ReturnType<typeof useForm>['register'];
}

export function OrderLinesForm({
  control,
  isEditMode,
  register,
}: OrderLinesFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAddItem = () => {
    // In schema, you expect these fields to be numbers, but are strings.
    append({ name: '', quantity: '', unit: '', tax: '', price: '' });
  };

  return (
    <StyledFieldset>
      <legend style={visuallyHidden}>
        <Typography variant="h4">Item</Typography>
      </legend>
      {fields.map((field, index) => (
        <OrderLinesRow
          isEditMode={isEditMode}
          key={field.id}
          index={index}
          register={register}
          remove={remove}
        />
      ))}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        {isEditMode && (
          <Button
            onClick={handleAddItem}
            color="secondary"
            variant="contained"
            type="submit"
          >
            <Box display="flex">
              <Icon sx={{ mr: 1 }}>add</Icon>
              <span>Add item</span>
            </Box>
          </Button>
        )}
      </Box>
    </StyledFieldset>
  );
}
