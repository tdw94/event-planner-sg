import React from 'react';
import {
  SafeAreaView, StatusBar
} from 'react-native';
import Navigation from './app/navigation';
import { screenStyles } from './app/styles/screen-styles';
import { UserProvider } from './app/context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaView style={screenStyles.screen}>
      <StatusBar translucent animated backgroundColor="transparent" />
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
