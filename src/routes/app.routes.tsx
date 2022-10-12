import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Home } from '../screens/Home'
import { StackParamList } from '../types/AppRoutes'

const AppStack = createNativeStackNavigator<StackParamList>()

export const AppRoutes: FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen name='Home' component={Home} />
  </AppStack.Navigator>
)
