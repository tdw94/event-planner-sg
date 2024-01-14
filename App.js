import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import Navigation from './app/navigation';
import { screenStyles } from './app/styles/screen-styles';
import { UserProvider } from './app/context/UserContext';

const App = () => {
  return (
    <SafeAreaView style={screenStyles.screen}>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </SafeAreaView>
  );
};

export default App;
