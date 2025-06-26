import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Hotel } from '../types/Hotel';
import HotelDetailScreen from '../screens/HotelDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import CityScreen from '../screens/CityScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  CityScreen: { cityName: string };
  HotelDetailScreen: { hotel: Hotel };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CityScreen"
      component={CityScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="HotelDetailScreen"
      component={HotelDetailScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
