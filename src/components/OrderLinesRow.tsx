import { Box, Icon, IconButton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

interface OrderLinesRowProps {
  register: ReturnType<typeof useForm>['register'];
  remove: (index: number) => void;
  index: number;
}

export function OrderLinesRow({ register, remove, index }: OrderLinesRowProps) {
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
          defaultValue=""
          label="Name"
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.quantity`)}
          defaultValue=""
          label="Amount"
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.unit`)}
          defaultValue=""
          label="Unit"
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.tax`)}
          defaultValue=""
          label="Tax"
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 2, flexBasis: 0 }}>
        <TextField
          {...register(`items.${index}.price`)}
          defaultValue=""
          label="Price"
          variant="standard"
          fullWidth
        />
      </Box>
      <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
        <IconButton aria-label="delete" onClick={() => remove(index)}>
          <Icon>delete</Icon>
        </IconButton>
      </Box>
    </Box>
  );
}
