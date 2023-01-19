import WifiManager from 'react-native-wifi-reborn'
import { WIFI_PASSWORD, WIFI_SSID } from '../../constants/env'

export const connectToWiFiAsync = async () => {
  await WifiManager.connectToProtectedSSID(WIFI_SSID, WIFI_PASSWORD, false)
}

export const disconnectFromWiFiAsync = async () => {
  await WifiManager.disconnectFromSSID(WIFI_SSID)
}
