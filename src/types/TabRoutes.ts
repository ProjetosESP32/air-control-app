import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from './AppRoutes'

export type TabParamList = {
  Home: undefined
  UserRooms: undefined
  Profile: undefined
}

export type BottomTabNavigation<K extends keyof TabParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, K>,
  NativeStackNavigationProp<StackParamList>
>
