import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from './env'
import { TOKEN_KEY } from '../constants/storage'

let fullToken: string | null = null

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
})

export const setApiAuthorization = async (type: string, token: string) => {
  fullToken = `${type} ${token}`
  await AsyncStorage.setItem(TOKEN_KEY, fullToken)
}

export const clearApiAuthorization = async () => {
  fullToken = null
  await AsyncStorage.removeItem(TOKEN_KEY)
}

const getToken = async () => {
  if (fullToken) return fullToken

  const savedToken = await AsyncStorage.getItem(TOKEN_KEY)

  if (savedToken) {
    fullToken = savedToken
    return fullToken
  }

  return null
}

api.interceptors.request.use(async config => {
  const token = await getToken()

  if (token) {
    config.headers = { Authorization: token }
  }

  return config
})

const isApplicationJSON = (header: string) => header.includes('application/json')

api.interceptors.response.use(response => {
  const contentTypeHeader =
    typeof response.headers.getContentType === 'function'
      ? response.headers.getContentType()
      : response.headers.getContentType
  const contentTypeString = String(contentTypeHeader)

  if (!isApplicationJSON(contentTypeString)) {
    throw new Error('Invalid Server Content-Type')
  }

  return response
})
