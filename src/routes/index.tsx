import { NavigationContainer } from '@react-navigation/native'
import { hideAsync } from 'expo-splash-screen'
import React, { FC, useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export const Routes: FC = () => {
  const { isSuccess, data: user, isLoading } = useUser()
  const isLoggedIn = isSuccess && !!user

  useEffect(() => {
    if (!isLoading) {
      void hideAsync()
    }
  }, [isLoading])

  if (isLoading) return null

  return <NavigationContainer>{isLoggedIn ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>
}
