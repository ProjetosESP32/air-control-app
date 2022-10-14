import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { StackParamList } from '../types/AppRoutes'
import { MainTabRoutes } from './tab.routes'

const AppStack = createNativeStackNavigator<StackParamList>()

export const AppRoutes: FC = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name='MainTab' component={MainTabRoutes} />
  </AppStack.Navigator>
)
