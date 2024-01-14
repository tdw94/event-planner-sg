import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth-stack';
import { useUser } from '../context/UserContext';
import HomeStack from './home-stack';

const Navigation = () => {
  const { user } = useUser();
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
