import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { screens } from '../constants/screens';
import DrawerContent from '../components/drawerContent';
import HomeStack from './home-stack';

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator screenOptions={{ headerShown: false }} drawerContent={() => <DrawerContent/>}>
      <DrawerNavigator.Screen name={screens.homeStack} component={HomeStack} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
