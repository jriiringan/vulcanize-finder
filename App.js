import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Home from './src/pages/home';

const App = () => {
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <Home />
    </SafeAreaView>
  );
};

const selfStyle = StyleSheet.create({
});

export default App;
