import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth-stack';
import { useUser } from '../context/UserContext';
import HomeStack from './home-stack';
import { ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';

const Navigation = () => {
  const { user, initializing } = useUser();
  if (initializing) {
    return (
      <ActivityIndicator animating size='large' color={colors.orange} />
    );
  };
  return (
    <NavigationContainer>
      {/* if the user authenticated, show the home screens, show auth screens otherwise */}
      {user
        ? (
          <HomeStack />
        )
        : (
          <AuthStack />
        )}
    </NavigationContainer>
  );
};

export default Navigation;
