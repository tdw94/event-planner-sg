import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../constants/screens';
import Welcome from '../screens/welcome';
import PersonalInfo from '../screens/personalInfo';
import Home from '../screens/home/home';
import { useUser } from '../context/UserContext';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const { freshUser } = useUser();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        {freshUser
          ? (
            <>
              <Stack.Screen name={screens.welcome} component={Welcome} />
              <Stack.Screen name={screens.personalInfo} component={PersonalInfo} />
            </>
          )
          : null}
      </>
      <Stack.Screen name={screens.home} component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
