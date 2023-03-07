import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import { useFonts } from 'expo-font';

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="LoginScreen">
        {/* <StatusBar /> */}
        <MainStack.Screen name="LoginScreen" component={LoginScreen} />
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        {/* <RegistrationScreen /> */}
        {/* <LoginScreen /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
