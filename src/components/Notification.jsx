import React from 'react';
import { useRecoilState } from 'recoil';

import { commonNotification } from 'app/state';
import Toast from './Toast';

// Notification provider
const Notification = () => {
  const [notification, setNotification] = useRecoilState(commonNotification);

  // on notification hide
  const onDismiss = () => setNotification((previous) => ({
    ...previous,
    isVisible: false,
  }));

  if (notification.isVisible) {
    return <Toast negative content={notification.message} onDismiss={onDismiss} />;
  }

  return null;
};

export default Notification;
