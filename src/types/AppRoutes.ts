import { NativeStackNavigationProp } from '@react-navigation/native-stack'

// regra desativada devido a necessidade de ser um `type`
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type StackParamList = {
  Home: undefined
}

export type StackNavigation<K extends keyof StackParamList> = NativeStackNavigationProp<StackParamList, K>
