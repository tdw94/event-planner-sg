import messaging from '@react-native-firebase/messaging';

export const foregroundNotification = (message) => {
  return messaging().onMessage(async (remoteMessage) => {
    message(remoteMessage);
  });
};

export const backgroundNotificationHandler = (message) => {
  // Register background handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    message(remoteMessage);
  });
};

export const getNotificationToken = async () => {
  return await messaging().getToken();
};
