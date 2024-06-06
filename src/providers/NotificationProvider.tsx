import { createContext, ReactNode, useContext, useState } from 'react';
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

  return (
    <NotificationContext.Provider value={{ setNotification }}>
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
