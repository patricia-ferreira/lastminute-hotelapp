import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export const LightTheme = {
    ...NavigationDefaultTheme,
    dark: false,
    colors: {
        primary: '#FF477E',
        background: '#EAEAEA',
        card: '#FFFFFF',
        text: '#2C2C2C',
        border: '#E0E0E0',
        notification: '#FFA726',
    }
};

export const DarkTheme = {
    ...NavigationDarkTheme,
    dark: true,
    colors: {
        primary: '#FF477E',
        background: '#121212',
        card: '#1F1F1F',
        text: '#EAF0F6',
        border: '#444444',
        notification: '#FFB74D',
    }
};
