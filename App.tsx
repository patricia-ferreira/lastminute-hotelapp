import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import AppNavigator from './src/navigation/index';
import { DarkTheme, LightTheme } from './src/theme/theme';

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer theme={isDark ? DarkTheme : LightTheme}>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
