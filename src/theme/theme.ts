import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export const LightTheme = {
    ...NavigationDefaultTheme,
    dark: false,
    colors: {
        primary: '#FF477E',
        background: '#FFFFFF',
        card: '#F6F6F6',
        text: '#1E2A38',
        border: '#E2E2E2',
        notification: 'gray',
    }
};

export const DarkTheme = {
    ...NavigationDarkTheme,
    dark: true,
    colors: {
        primary: '#FF477E',
        background: '#121212',
        card: '#1E1E1E',
        text: '#EAF0F6',
        border: '#3A3A3A',
        notification: 'gray',
    }
};
