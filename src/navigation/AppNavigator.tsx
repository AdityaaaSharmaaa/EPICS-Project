import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Built-in Icons
import { COLORS } from '../theme/colors'; // Import our new theme

// Screens
import { DashboardScreen } from '../screens/DashboardScreen';
import { LedgerScreen } from '../screens/LedgerScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { MFIScreen } from '../screens/MFIScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { 
            height: 70, // Taller for easier touch
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: COLORS.card,
            borderTopColor: COLORS.border,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        // Dynamic Icon Logic
        tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === 'Dashboard') {
                iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Ledger') {
                iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Pay') {
                iconName = focused ? 'qr-code' : 'qr-code-outline';
            } else if (route.name === 'MFI') {
                iconName = focused ? 'business' : 'business-outline';
            }

            return <Ionicons name={iconName} size={28} color={color} />;
        },
    })}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Pay" component={PaymentScreen} /> 
      <Tab.Screen name="Ledger" component={LedgerScreen} />
      <Tab.Screen name="MFI" component={MFIScreen} />
    </Tab.Navigator>
  );
}

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={TabNavigator} />
    </Stack.Navigator>
  );
};