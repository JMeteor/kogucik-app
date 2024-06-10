import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import {
  NotificationAlert,
  NotificationAlertProps,
} from '../components/NotificationAlert.tsx';

interface NotificationContextData {
  setNotification: (notification: NotificationAlertProps | null) => void;
}

const NotificationContext = createContext<NotificationContextData>({
  setNotification: () => {},
});

const NOTIFICATION_DISPLAY_TIME = 5000;

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within a NotificationProvider',
    );
  }
  return context;
};

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] =
    useState<NotificationAlertProps | null>(null);
  const timeoutId = useRef<number | null>(null);

  const handleSetNotification = (
    notification: NotificationAlertProps | null,
  ) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    setNotification(notification);

    if (notification !== null) {
      timeoutId.current = window.setTimeout(() => {
        setNotification(null);
      }, NOTIFICATION_DISPLAY_TIME);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ setNotification: handleSetNotification }}
    >
      {notification && (
        <NotificationAlert
          title={notification.title}
          severity={notification.severity}
        >
          {notification.children}
        </NotificationAlert>
      )}
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
