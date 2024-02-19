import { Box, Icon, IconButton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface OrderLinesRowProps {
  register: ReturnType<typeof useForm>['register'];
  remove: (index: number) => void;
  index: number;
  isEditMode?: boolean;
}

export function OrderLinesRow({
  register,
  remove,
  index,
  isEditMode,
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
          label={t('ORDER_LINE.NAME')}
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.amount`)}
          disabled={!isEditMode}
          defaultValue=""
          label={t('ORDER_LINE.AMOUNT')}
          variant="standard"
          required
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.unit`)}
          disabled={!isEditMode}
          defaultValue=""
          label={t('ORDER_LINE.UNIT')}
          variant="standard"
          required
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.tax`)}
          disabled={!isEditMode}
          defaultValue=""
          label={t('ORDER_LINE.TAX')}
          variant="standard"
          required
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.price`)}
          disabled={!isEditMode}
          defaultValue=""
          label={t('ORDER_LINE.PRICE')}
          variant="standard"
          required
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
