import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';
import { colors } from './app/constants/colors';
import Navigation from './app/navigation';
import { screenStyles } from './app/styles/screen-styles';

const App = () => {
  return (
    <SafeAreaView style={screenStyles.screen}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.white
  },
  po: {

  }
});

export default App;
