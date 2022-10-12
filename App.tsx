import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
  useFonts,
} from '@expo-google-fonts/montserrat'
import { addEventListener } from '@react-native-community/netinfo'
import { preventAutoHideAsync } from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React, { FC } from 'react'
import { LogBox } from 'react-native'
import { onlineManager, QueryClient, QueryClientProvider } from 'react-query'
import { Routes } from './src/routes'
import { theme } from './src/theme'

LogBox.ignoreLogs(['Setting a timer'])

onlineManager.setEventListener(setOnline =>
  addEventListener(({ isConnected }) => {
    setOnline(!!isConnected)
  }),
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), staleTime: 1000 * 60 },
  },
})

void preventAutoHideAsync()

const App: FC = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic,
  })

  if (!fontsLoaded) return null

  return (
    <>
      <StatusBar style='light' translucent />
      <NativeBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </NativeBaseProvider>
    </>
  )
}

export default App
