import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ControlPageProps } from '../screens/Control'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export type StackParamList = {
  MainTab: undefined
  Control: ControlPageProps
  Login: undefined
  Register: undefined
}

export type TabParamList = {
  Home: undefined
  UserRooms: undefined
  Profile: undefined
}

export type StackNavigation<K extends keyof StackParamList> = NativeStackNavigationProp<StackParamList, K>

export type StackProp<K extends keyof StackParamList> = RouteProp<StackParamList, K>

export type BottomTabNavigation<K extends keyof TabParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, K>,
  NativeStackNavigationProp<StackParamList>
>
