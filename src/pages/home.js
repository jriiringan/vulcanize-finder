import React, { useEffect, useReducer, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
  Image
} from 'react-native';


import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapstyle from '../mapstyle';
import { regionFrom } from '../helper';

const TIRE_ICON = require('../assets/image/wheel.png');

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.05

const GEOLOCATION_OPTION = { 
    enableHighAccuracy: true, 
    timeout: 15000, 
    maximumAge: 10000 
}

const INITIAL_STATE = {
    region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    }
}

function reducer(state, action) {
    switch (action.type) {
      case 'UPDATE_REGION':
        return {...INITIAL_STATE, 
            region: action.region
        };
        break;
    // case 'UPDATE_MARKERS': 
    //     return {...INITIAL_STATE, 
    //         markers: [...state.markers, ...action.markers]};
    //     break;
      default:
        return {...INITIAL_STATE};
    }
}

function CustomMarkers({title, coordinate, description = ''}){
    let generated_key = `${Math.ceil(coordinate.longitude)}${Math.floor(coordinate.latitude)}`
    return (<Marker
        key={generated_key}
        coordinate={coordinate}
        title={title}
        description={description}
        pinColor={'navy'}
      >
        <Text>{title}</Text>
        <CustomImage/>
      </Marker>)
} 

function CustomImage(){
    return(<Image source={TIRE_ICON} style={{width: 35, height: 35}}/>)
}

export default function Home(props){
    const [markersList, setMarkers] = useState([])
    const window = useWindowDimensions()
    const {height,width} = window
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    useEffect(()=>{
        const setup = () => {
            Geolocation.getCurrentPosition(info => {
                let { coords } = info
                if(state.region.latitude !== coords.latitude && state.region.longitude !== coords.longitude){
                    let createdRegion = regionFrom([coords]);
                    dispatch({type: 'UPDATE_REGION', region: createdRegion})

                    setMarkers(oldValue =>                         
                        [{    title: 'Vulcanizing ni pare',
                            coordinate: {
                                latitude: coords.latitude,
                                longitude: coords.longitude
                            },
                            description: 'Open 24/7'
                        }]);
                    // dispatch({type: 'UPDATE_MARKERS', 
                    //     markers: [{
                    //         title: 'This is a title',
                    //         coordinate: {
                    //             latitude: coords.latitude,
                    //             longitude: coords.longitude
                    //         }
                    //     }]
                    // });
                }
                
            },((err)=> { console.log('error')}), GEOLOCATION_OPTION)
        }
        setup()
    })

    const onRegionChange = (region) => {

    }
    // useEffect(()=>{
    //     Geolocation.getCurrentPosition(info => console.log(info));
    // })
  
    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={selfStyle.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={selfStyle.map}
                region={state.region}
                zoomEnabled={true}
                minZoomLevel={0}
                maxZoomLevel={18}
                customMapStyle={mapstyle}     
                onRegionChange={onRegionChange}       
            >
            {markersList.map((item,k) => <CustomMarkers key={k} title={item.title} coordinate={item.coordinate} />)}
            </MapView>

        </View>
        <View style={selfStyle.footer}>
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
  footer: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    bottom: 0,
    height: 100,
    backgroundColor: '#fff',
    elevation: 1
  }
});
