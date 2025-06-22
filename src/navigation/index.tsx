import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Hotel } from '../types/Hotel';
import HotelListScreen from '../screens/HotelListScreen';
import HotelDetailScreen from '../screens/HotelDetailScreen';

export type RootStackParamList = {
  HotelListScreen: undefined;
  HotelDetailScreen: { hotel: Hotel };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HotelListNavigator = () => (
  <Stack.Navigator initialRouteName="HotelListScreen">
    <Stack.Screen
      name="HotelListScreen"
      component={HotelListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="HotelDetailScreen"
      component={HotelDetailScreen}
      options={({ navigation }) => ({
        title: 'Hotel Details',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Ionicons
            name="arrow-back"
            size={24}
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 12 }}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 60,
          elevation: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'HotelListNavigator') {
            iconName = focused ? 'home' : 'home-outline';
          } else {
            iconName = 'alert';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
      })}
    >
      <Tab.Screen name="HotelListNavigator" component={HotelListNavigator} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
