import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ControlPageProps } from '../screens/Control'

export type StackParamList = {
  MainTab: undefined
  Control: ControlPageProps
}

export type StackNavigation<K extends keyof StackParamList> = NativeStackNavigationProp<StackParamList, K>

export type StackProp<K extends keyof StackParamList> = RouteProp<StackParamList, K>
