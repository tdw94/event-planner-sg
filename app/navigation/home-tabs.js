import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screens } from '../constants/screens';
import Home from '../screens/home/home';
import TabBar from '../components/tabBar';
import Profile from '../screens/profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../screens/editProfile';

const TabNavigator = createBottomTabNavigator();

const ProfileStack = createNativeStackNavigator();

const ProfileTabs = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name={screens.profile} component={Profile} />
      <ProfileStack.Screen name={screens.editProfile} component={EditProfile} />
    </ProfileStack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <TabNavigator.Navigator screenOptions={{ headerShown: false }} tabBar={() => <TabBar />}>
      <TabNavigator.Screen name={screens.home} component={Home} />
      <TabNavigator.Screen name={screens.profileStack} component={ProfileTabs} />
    </TabNavigator.Navigator>
  );
};

export default HomeTabs;
