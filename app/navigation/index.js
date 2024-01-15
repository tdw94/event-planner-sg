import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth-stack';
import { useUser } from '../context/UserContext';
import RootStack from './root-stack';
import { StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { requestNotifications } from '../services/permission';
import { foregroundNotification } from '../services/firebase/notification';
import Toast from 'react-native-toast-message';
import { showInfoToast, toastConfig } from '../components/toast';
import ListLoader from '../components/listLoader';
import SplashScreen from 'react-native-splash-screen';

const Navigation = () => {
  const { user, initializing } = useUser();

  const onReadyNavigation = () => {
    // request permission for notifications
    requestNotifications().catch(console.error);
    // hide splash screen
    SplashScreen.hide();
  };

  useEffect(() => {
    // subscribe for foreground notifications, and show the notification in a toast
    const unsubscribe = foregroundNotification((message) => {
      showInfoToast(message?.notification?.body || '');
    });
    return unsubscribe;
  }, []);

  // show loading state when initializing app
  if (initializing) {
    return (
      <ListLoader style={styles.loader} />
    );
  };
  return (
    <>
      <NavigationContainer onReady={onReadyNavigation}>
        {/* if the user authenticated, show the home screens, show auth screens otherwise */}
        {user
          ? (
            <RootStack />
          )
          : (
            <AuthStack />
          )}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  loader: {
    backgroundColor: colors.white,
    flex: 1
  }
});
