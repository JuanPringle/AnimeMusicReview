import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import StackNavigation from './Hooks/StackNavigation';
import { View, Text, StyleSheet } from 'react-native';
import {store} from './Store/store'
import {Provider} from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    color: 'blue',
  },
});