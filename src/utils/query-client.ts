import AsyncStorage from '@react-native-async-storage/async-storage'
import { addEventListener } from '@react-native-community/netinfo'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { focusManager, onlineManager, QueryClient } from '@tanstack/react-query'
import { AppState } from 'react-native'

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

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000, // 5s
      cacheTime: 1000 * 60 * 60 * 24, // 24h
      retry: false,
    },
  },
})
