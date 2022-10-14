import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from './AppRoutes'

// regra desativada devido a necessidade de ser um `type`
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TabParamList = {
  Home: undefined
  UserRooms: undefined
  Profile: undefined
}

export type BottomTabNavigation<K extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, K>,
  NativeStackScreenProps<StackParamList>
>
