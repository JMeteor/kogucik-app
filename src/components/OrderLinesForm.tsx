import { visuallyHidden } from '@mui/utils';
import { Box, Button, Icon, Typography } from '@mui/material';
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useFieldArray,
} from 'react-hook-form';
import { OrderLinesRow } from './OrderLinesRow.tsx';
import { StyledFieldset } from './StyledFieldset.tsx';
import { generateUniqueId } from '../helpers/generateId.ts';
import { useTranslation } from 'react-i18next';
import type { Invoice } from '../types/Invoice.ts';
import { NewInvoice } from '../types/NewInvoice.ts';

interface OrderLinesFormProps {
  isEditMode?: boolean;
  control: Control<Invoice | NewInvoice>;
  register: UseFormRegister<Invoice | NewInvoice>;
  errors: FieldErrors<Invoice | NewInvoice>;
}

export function OrderLinesForm({
  control,
  isEditMode,
  register,
  errors,
}: OrderLinesFormProps) {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAddItem = () => {
    append({
      id: generateUniqueId(),
      name: '',
      amount: null,
      unit: '',
      tax: null,
      price: '',
    });
  };

  return (
    <StyledFieldset>
      <legend style={visuallyHidden}>
        <Typography variant="h4">{t('ORDER_LINE.ITEMS')}</Typography>
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
          <Button onClick={handleAddItem} color="secondary" variant="contained">
            <Box display="flex">
              <Icon sx={{ mr: 1 }}>add</Icon>
              <span>{t('ORDER_LINE.ADD_ITEM')}</span>
            </Box>
          </Button>
        )}
      </Box>
    </StyledFieldset>
  );
}
