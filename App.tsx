import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import MainNavigator from './src/navigation/index';

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}