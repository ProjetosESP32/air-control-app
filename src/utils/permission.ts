import { PermissionsAndroid } from 'react-native'

export const checkLocationPermission = async () =>
  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

export const requestLocationPermission = async () => {
  const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    title: 'A permissão de localização é necessária para conexões WiFi',
    message: 'O aplicativo precisa da permissão de localização para pode analizar as conexões WiFi',
    buttonNegative: 'Negar',
    buttonPositive: 'Permitir',
  })

  if (result === PermissionsAndroid.RESULTS.GRANTED) return true

  return false
}
