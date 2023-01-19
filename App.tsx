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
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { preventAutoHideAsync } from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React, { FC } from 'react'
import { LogBox } from 'react-native'
import { RestoringComponent } from './components/RestoringComponent'
import { AlertProvider } from './hooks/useAlert'
import { AlertDialogProvider } from './hooks/useAlertDialog'
import { Routes } from './routes'
import { theme } from './theme'
import { asyncStoragePersister, queryClient } from './utils/query-client'

LogBox.ignoreLogs(['Setting a timer'])

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
            <AlertDialogProvider>
              <AlertProvider>
                <Routes />
              </AlertProvider>
            </AlertDialogProvider>
          </RestoringComponent>
        </PersistQueryClientProvider>
      </NativeBaseProvider>
    </>
  )
}

export default App
