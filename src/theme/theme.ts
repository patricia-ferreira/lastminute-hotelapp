import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export const LightTheme = {
    ...NavigationDefaultTheme,
    dark: false,
    colors: {
        primary: '#FF477E',
        background: '#FFFFFF',
        card: '#FAFAFA',
        text: '#1E2A38',
        border: '#CCCCCC',
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
