import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Hotel } from '../types/Hotel';
import HotelListScreen from '../screens/HotelListScreen';
import HotelDetailScreen from '../screens/HotelDetailScreen';

export type RootStackParamList = {
  HotelList: undefined;
  HotelDetail: { hotel: Hotel };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
     <Stack.Navigator initialRouteName="HotelList">
      <Stack.Screen name="HotelList" component={HotelListScreen} options={{ title: 'Hotels' }} />
      <Stack.Screen name="HotelDetail" component={HotelDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}
