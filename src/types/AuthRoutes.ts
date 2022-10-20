import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type StackParamList = {
  Login: undefined
  Register: undefined
}

export type StackNavigation<K extends keyof StackParamList> = NativeStackNavigationProp<StackParamList, K>
