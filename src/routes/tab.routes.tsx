import { Feather } from '@expo/vector-icons'
import type { Icon as IconType } from '@expo/vector-icons/build/createIconSet'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'native-base'
import React, { FC } from 'react'
import { Home } from '../screens/Home'
import { Profile } from '../screens/Profile'
import { UserRooms } from '../screens/UserRooms'
import { TabParamList } from '../types/TabRoutes'

const MainTab = createBottomTabNavigator<TabParamList>()

interface TabBarIconProps {
  size: number
  focused: boolean
}

type IconKey<I> = I extends IconType<infer K, string> ? K : never

function makeTabBarIconComponent<K extends IconKey<typeof Feather>>(iconName: K) {
  const TabBarIcon: FC<TabBarIconProps> = ({ size, focused }) => (
    <Icon as={Feather} name={iconName} size={size} color={focused ? 'secondary.300' : 'primary.300'} />
  )

  return TabBarIcon
}

export const MainTabRoutes: FC = () => (
  <MainTab.Navigator screenOptions={{ headerShown: false, lazy: true }}>
    <MainTab.Screen name='Home' component={Home} options={{ tabBarIcon: makeTabBarIconComponent('home') }} />
    <MainTab.Screen
      name='UserRooms'
      component={UserRooms}
      options={{ tabBarIcon: makeTabBarIconComponent('list'), title: 'Salas' }}
    />
    <MainTab.Screen
      name='Profile'
      component={Profile}
      options={{ tabBarIcon: makeTabBarIconComponent('user'), title: 'Perfil' }}
    />
  </MainTab.Navigator>
)
