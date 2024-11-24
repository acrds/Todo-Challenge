import './gesture-handler';
import React, { useEffect } from 'react';
import {MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
import TasksScreen from './src/screens/TasksScreen';

export default function App() {

  const loadFonts = async () => {
    await Font.loadAsync({
      'MaterialIcons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
      background: 'gray'
    },
  };

  return (
    <PaperProvider theme={theme}>
        <AppNavigator/>
    </PaperProvider>
  );
}
