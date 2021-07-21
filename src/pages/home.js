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
import mapstyle from '../mapstyle';

export default function Home(props){
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={selfStyle.container}>
        <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={selfStyle.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={mapstyle}
      ></MapView>
      </View>
    </SafeAreaView>
  );
};

const selfStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
