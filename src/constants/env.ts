import Constants from 'expo-constants'

export const API_URL: string = Constants.manifest?.extra?.API_URL || ''
export const BASE_URL: string = Constants.manifest?.extra?.BASE_URL || ''
export const SOCKET_HOST: string = Constants.manifest?.extra?.SOCKET_HOST || ''
export const SOCKET_PORT: number = Number(Constants.manifest?.extra?.SOCKET_PORT) || 0
