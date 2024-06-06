import { ReactNode } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import styled from '@emotion/styled';

export interface NotificationAlertProps {
  severity: 'success' | 'error' | 'info' | 'warning';
  title?: ReactNode;
  children: ReactNode;
}

const AlertContainer = styled('div')({
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
});

export function NotificationAlert({
  severity,
  title,
  children,
}: NotificationAlertProps) {
  return (
    <AlertContainer>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </AlertContainer>
  );
}
