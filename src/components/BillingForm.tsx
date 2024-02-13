import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

interface BillingFormProps {
  isEditMode?: boolean;
  name: string;
  register: ReturnType<typeof useForm>['register'];
}

export function BillingForm({ name, register, isEditMode }: BillingFormProps) {
  return (
    <StyledFieldset>
      <legend>
        <Typography variant="h4">{name.toUpperCase()}</Typography>
      </legend>

      <TextField
        {...register(`${name}.companyName`)}
        disabled={!isEditMode}
        label="Company name"
        variant="standard"
        fullWidth
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.city`)}
        disabled={!isEditMode}
        label="City"
        variant="standard"
        fullWidth
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.street`)}
        disabled={!isEditMode}
        label="Street"
        variant="standard"
        fullWidth
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.postcode`)}
        disabled={!isEditMode}
        label="Postcode"
        variant="standard"
        fullWidth
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.nip`)}
        disabled={!isEditMode}
        label="NIP"
        variant="standard"
        fullWidth
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.phone`)}
        disabled={!isEditMode}
        label="Phone"
        variant="standard"
        fullWidth
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.email`)}
        disabled={!isEditMode}
        label="E-mail"
        variant="standard"
        fullWidth
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.bankAccount`)}
        disabled={!isEditMode}
        label="Bank account"
        variant="standard"
        fullWidth
      />
    </StyledFieldset>
  );
}
