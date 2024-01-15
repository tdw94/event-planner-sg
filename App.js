import React from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet
} from 'react-native';
import Navigation from './app/navigation';
import { UserProvider } from './app/context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { colors } from './app/constants/colors';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaView style={styles.screen}>
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

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white
  }
});
