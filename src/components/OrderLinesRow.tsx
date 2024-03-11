import { Box, Icon, IconButton, TextField } from '@mui/material';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { Invoice } from '../types/Invoice.ts';

interface OrderLinesRowProps {
  register: UseFormRegister<Invoice>;
  remove: (index: number) => void;
  index: number;
  isEditMode?: boolean;
  errors: FieldErrors<Invoice>;
}

export function OrderLinesRow({
  register,
  remove,
  index,
  isEditMode,
  errors,
}: OrderLinesRowProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: 2,
        justifyContent: 'space-between',
        mb: 3,
      }}
    >
      <Box sx={{ flexGrow: 11, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.name`)}
          disabled={!isEditMode}
          defaultValue=""
          error={Boolean(errors?.items?.[index]?.name)}
          label={t('ORDER_LINE.NAME')}
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.amount`, { valueAsNumber: true })}
          disabled={!isEditMode}
          defaultValue=""
          error={Boolean(errors?.items?.[index]?.amount)}
          label={t('ORDER_LINE.AMOUNT')}
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.unit`)}
          disabled={!isEditMode}
          defaultValue=""
          error={Boolean(errors?.items?.[index]?.unit)}
          label={t('ORDER_LINE.UNIT')}
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.tax`, { valueAsNumber: true })}
          disabled={!isEditMode}
          defaultValue=""
          error={Boolean(errors?.items?.[index]?.tax)}
          label={t('ORDER_LINE.TAX')}
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.price`, { valueAsNumber: true })}
          disabled={!isEditMode}
          defaultValue=""
          error={Boolean(errors?.items?.[index]?.price)}
          label={t('ORDER_LINE.PRICE')}
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
        <IconButton
          aria-label={t('LABELS.DELETE')}
          onClick={() => remove(index)}
          disabled={!isEditMode}
        >
          <Icon>delete</Icon>
        </IconButton>
      </Box>
    </Box>
  );
}
