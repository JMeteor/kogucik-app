import { ReactNode } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { useNotificationContext } from '../providers/NotificationProvider.tsx';

interface NotificationAlertProps {
  severity: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  children: ReactNode;
}

export function NotificationAlert({
  severity,
  title,
  children,
}: NotificationAlertProps) {
  const { showNotification } = useNotificationContext();

  return showNotification ? (
    <div
      style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </div>
  ) : null;
}
