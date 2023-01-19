import { PermissionsAndroid } from 'react-native'
import WifiManager from 'react-native-wifi-reborn'
import { WIFI_PASSWORD, WIFI_SSID } from '../../constants/env'

const checkLocationPermission = async () =>
  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

const requestLocationPermission = async () => {
  const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    title: 'A permissão de localização é necessária para conexões WiFi',
    message: 'O aplicativo precisa da permissão de localização para pode analizar as conexões WiFi',
    buttonNegative: 'Negar',
    buttonPositive: 'Permitir',
  })

  if (result === PermissionsAndroid.RESULTS.GRANTED) return true

  return false
}

const requestPermission = async () => {
  const hasGranted = await checkLocationPermission()

  if (hasGranted) return

  const result = await requestLocationPermission()

  if (result) return

  throw new Error('NO_PERMISSION')
}

export const connectToWiFiAsync = async () => {
  await requestPermission()

  await WifiManager.connectToProtectedSSID(WIFI_SSID, WIFI_PASSWORD, false)
  await WifiManager.forceWifiUsageWithOptions(true, { noInternet: true })
}

export const disconnectFromWiFiAsync = async () => {
  await requestPermission()

  await WifiManager.disconnect()
}
