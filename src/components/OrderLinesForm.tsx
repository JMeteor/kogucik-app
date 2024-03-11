import { visuallyHidden } from '@mui/utils';
import { Box, Button, Icon, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { OrderLinesRow } from './OrderLinesRow.tsx';
import { StyledFieldset } from './StyledFieldset.tsx';
import { generateUniqueId } from '../helpers/generateId.ts';

interface OrderLinesFormProps {
  isEditMode?: boolean;
  control: ReturnType<typeof useForm>['control'];
  register: ReturnType<typeof useForm>['register'];
  errors: Record<string, any>;
}

export function OrderLinesForm({
  control,
  isEditMode,
  register,
  errors,
}: OrderLinesFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAddItem = () => {
    append({
      id: generateUniqueId(),
      name: '',
      quantity: '',
      unit: '',
      tax: '',
      price: '',
    });
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
          errors={errors}
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
