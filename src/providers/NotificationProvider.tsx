import { createContext, ReactNode, useContext, useState } from 'react';
import { defaultNotification } from '../components/NotificationAlert.tsx';

interface NotificationContextData {
  showNotification: boolean;
  setShowNotification: (showNotification: boolean) => void;
}

const NotificationContext = createContext<NotificationContextData>({
  showNotification: false,
  setShowNotification: () => {},
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
  const [showNotification, setShowNotification] = useState(false);

  const value = {
    showNotification,
    setShowNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
