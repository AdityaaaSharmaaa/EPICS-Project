import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { RealmContextObj } from './src/models/RealmContext';
import './src/i18n/i18n'; 

// This provides the mock database to the whole app
const { RealmProvider } = RealmContextObj;

export default function App() {
  return (
    <RealmProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </RealmProvider>
  );
}