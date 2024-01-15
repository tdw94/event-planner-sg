import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import { screens } from '../constants/screens';
import SignUp from '../screens/signup';

const Stack = createNativeStackNavigator();

// screens for authentication flow
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.login} component={Login} />
      <Stack.Screen name={screens.signup} component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
