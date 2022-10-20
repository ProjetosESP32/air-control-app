import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { HeaderTitle } from '../components/HeaderTitle'
import { Control } from '../screens/Control'
import { StackParamList } from '../types/AppRoutes'
import { MainTabRoutes } from './tab.routes'

const AppStack = createNativeStackNavigator<StackParamList>()

export const AppRoutes: FC = () => (
  <AppStack.Navigator screenOptions={{ headerTitle: HeaderTitle }}>
    <AppStack.Screen name='MainTab' component={MainTabRoutes} options={{ headerShown: false }} />
    <AppStack.Screen name='Control' component={Control} options={{ title: 'Controle' }} />
  </AppStack.Navigator>
)
