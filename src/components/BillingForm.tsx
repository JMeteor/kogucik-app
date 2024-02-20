import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

interface BillingFormProps {
  isEditMode?: boolean;
  name: string;
  register: ReturnType<typeof useForm>['register'];
  errors: Record<string, any>;
}

export function BillingForm({
  name,
  register,
  isEditMode,
  errors,
}: BillingFormProps) {
  const { t } = useTranslation();

  return (
    <StyledFieldset>
      <legend>
        <Typography variant="h4">
          {t(`INVOICE.${name.toUpperCase()}`)}
        </Typography>
      </legend>

      <TextField
        {...register(`${name}.companyName`)}
        disabled={!isEditMode}
        label={t('CONTACT_FORM.COMPANY_NAME')}
        variant="standard"
        fullWidth
        required
        error={Boolean(errors && errors[`${name}.companyName`])}
        helperText={errors?.[`${name}.companyName`]?.message}
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.city`)}
        disabled={!isEditMode}
        label={t('CONTACT_FORM.CITY')}
        variant="standard"
        fullWidth
        required
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.street`)}
        disabled={!isEditMode}
        label={t('CONTACT_FORM.STREET')}
        variant="standard"
        fullWidth
        required
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.postcode`)}
        disabled={!isEditMode}
        label={t('CONTACT_FORM.POSTCODE')}
        variant="standard"
        fullWidth
        required
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.nip`)}
        disabled={!isEditMode}
        label={t('CONTACT_FORM.NIP')}
        variant="standard"
        fullWidth
        required
        inputProps={{ pattern: '[0-9]{10}' }}
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.phone`)}
        disabled={!isEditMode}
        label={t('CONTACT_FORM.PHONE')}
        variant="standard"
        fullWidth
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.email`)}
        disabled={!isEditMode}
        label={t('CONTACT_FORM.EMAIL')}
        variant="standard"
        fullWidth
        required
        type="email"
        sx={{ mb: 1 }}
      />

      <TextField
        {...register(`${name}.bankAccount`)}
        disabled={!isEditMode}
        label={t('CONTACT_FORM.BANK_ACCOUNT')}
        variant="standard"
        required
        fullWidth
      />
    </StyledFieldset>
  );
}
