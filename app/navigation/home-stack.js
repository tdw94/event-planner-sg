import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screens } from '../constants/screens';
import Home from '../screens/home/home';
import TabBar from '../components/tabBar';
import Profile from '../screens/profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../screens/editProfile';
import Posts from '../screens/posts';
import Comments from '../screens/comments';

const TabNavigator = createBottomTabNavigator();
const HomeNavigator = createNativeStackNavigator();

// navigator for home screens
const HomeStack = () => {
  return (
    <HomeNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeNavigator.Screen name={screens.homeTabs} component={HomeTabs} />
      <HomeNavigator.Screen name={screens.editProfile} component={EditProfile} />
      <HomeNavigator.Screen name={screens.posts} component={Posts} />
      <HomeNavigator.Screen name={screens.comments} component={Comments} />
    </HomeNavigator.Navigator>
  );
};

// tab navigator for home
const HomeTabs = () => {
  return (
    <TabNavigator.Navigator screenOptions={{ headerShown: false }} tabBar={() => <TabBar />}>
      <TabNavigator.Screen name={screens.home} component={Home} />
      <TabNavigator.Screen name={screens.profile} component={Profile} />
    </TabNavigator.Navigator>
  );
};

export default HomeStack;
