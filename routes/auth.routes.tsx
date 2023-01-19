import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Login } from '../screens/Login'
import { Register } from '../screens/Register'
import { StackParamList } from '../types/AuthRoutes'

const AuthStack = createNativeStackNavigator<StackParamList>()

export const AuthRoutes: FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name='Login' component={Login} />
    <AuthStack.Screen name='Register' component={Register} />
  </AuthStack.Navigator>
)
