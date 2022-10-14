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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addEventListener } from '@react-native-community/netinfo'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { focusManager, MutationCache, onlineManager, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { preventAutoHideAsync } from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React, { FC } from 'react'
import { AppState, LogBox } from 'react-native'
import { RestoringComponent } from './src/components/RestoringComponent'
import { Routes } from './src/routes'
import { theme } from './src/theme'

LogBox.ignoreLogs(['Setting a timer'])

onlineManager.setEventListener(setOnline =>
  addEventListener(({ isConnected, isInternetReachable }) => {
    setOnline(!!isConnected && !!isInternetReachable)
  }),
)

focusManager.setEventListener(handleFocus => {
  const listener = AppState.addEventListener('change', state => {
    handleFocus(state === 'active')
  })

  return () => listener.remove()
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000, // 5s
      cacheTime: 1000 * 60 * 60 * 24, // 24h
      retry: false,
    },
  },
  mutationCache: new MutationCache(),
})

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
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
      <StatusBar style='dark' translucent />
      <NativeBaseProvider theme={theme}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}
          onSuccess={async () => {
            await queryClient.resumePausedMutations()
            await queryClient.invalidateQueries()
          }}
        >
          <RestoringComponent>
            <Routes />
          </RestoringComponent>
        </PersistQueryClientProvider>
      </NativeBaseProvider>
    </>
  )
}

export default App
