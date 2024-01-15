import messaging from '@react-native-firebase/messaging';

export const foregroundNotification = (message) => {
  return messaging().onMessage((remoteMessage) => {
    message(remoteMessage);
  });
};

export const backgroundNotificationHandler = (message) => {
  // Register background handler
  messaging().setBackgroundMessageHandler((remoteMessage) => {
    message(remoteMessage);
  });
};

export const getNotificationToken = async () => {
  return await messaging().getToken();
};
