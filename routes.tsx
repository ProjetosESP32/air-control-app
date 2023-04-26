import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { hideAsync } from 'expo-splash-screen'
import { Icon } from 'native-base'
import React, { FC, useEffect } from 'react'
import { HeaderTitle } from './components/HeaderTitle'
import { useUser } from './hooks/useUser'
import { Control } from './screens/Control'
import { Home } from './screens/Home'
import { Login } from './screens/Login'
import { Profile } from './screens/Profile'
import { Register } from './screens/Register'
import { UserRooms } from './screens/UserRooms'
import { navigationTheme } from './theme'
import { StackParamList, TabParamList } from './types/routes'

const S = createNativeStackNavigator<StackParamList>()
const B = createBottomTabNavigator<TabParamList>()

const TabRoutes = () => (
  <B.Navigator
    screenOptions={{
      headerShown: false,
      lazy: true,
    }}
  >
    <B.Screen
      name='Home'
      component={Home}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <Icon as={Feather} name='home' size={size} color={focused ? 'secondary.300' : 'primary.300'} />
        ),
      }}
    />
    <B.Screen
      name='UserRooms'
      component={UserRooms}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <Icon as={Feather} name='list' size={size} color={focused ? 'secondary.300' : 'primary.300'} />
        ),
        title: 'Salas',
      }}
    />
    <B.Screen
      name='Profile'
      component={Profile}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <Icon as={Feather} name='user' size={size} color={focused ? 'secondary.300' : 'primary.300'} />
        ),
        title: 'Perfil',
      }}
    />
  </B.Navigator>
)

export const Routes: FC = () => {
  const { isSuccess, data: user, isLoading } = useUser()
  const isLoggedIn = isSuccess && !!user

  useEffect(() => {
    if (!isLoading) {
      void hideAsync()
    }
  }, [isLoading])

  if (isLoading) return null

  return (
    <NavigationContainer theme={navigationTheme}>
      <S.Navigator screenOptions={{ headerTitle: HeaderTitle }}>
        {isLoggedIn ? (
          <>
            <S.Screen name='MainTab' component={TabRoutes} options={{ headerShown: false }} />
            <S.Screen name='Control' component={Control} options={{ title: 'Controle' }} />
          </>
        ) : (
          <>
            <S.Screen name='Login' component={Login} />
            <S.Screen name='Register' component={Register} />
          </>
        )}
      </S.Navigator>
    </NavigationContainer>
  )
}
