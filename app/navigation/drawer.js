import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { screens } from '../constants/screens';
import HomeTabs from './home-tabs';
import DrawerContent from '../components/drawerContent';
import EditProfile from '../screens/editProfile';

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator screenOptions={{ headerShown: false }} drawerContent={() => <DrawerContent/>}>
      <DrawerNavigator.Screen name={screens.homeTabs} component={HomeTabs} />
      <DrawerNavigator.Screen name={screens.editProfile} component={EditProfile} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
