import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../constants/screens';
import Welcome from '../screens/welcome';
import PersonalInfo from '../screens/personalInfo';
import { useUser } from '../context/UserContext';
import Drawer from './drawer';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const { freshUser } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        {/* show welcome & user info screens in 1st time login */}
        {freshUser
          ? (
            <>
              <Stack.Screen name={screens.welcome} component={Welcome} />
              <Stack.Screen name={screens.personalInfo} component={PersonalInfo} />
            </>
          )
          : (
            <Stack.Screen name={screens.homeDrawer} component={Drawer} />
          )}
      </>
    </Stack.Navigator>
  );
};

export default RootStack;
