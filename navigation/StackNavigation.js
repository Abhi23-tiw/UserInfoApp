import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../components/Home';
import Onboarding from '../components/Onboarding';

const StackNavigation = () => {
  // Stack Navigation 
  const Stack = createNativeStackNavigator();

  return (
    // Initial Page
    <Stack.Navigator initialRouteName='Onboarding' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name='UserInfo' component={Home} />
    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})