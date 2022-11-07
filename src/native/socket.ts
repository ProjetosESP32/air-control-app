import { NativeModules } from 'react-native'

const { SocketModule } = NativeModules

interface SocketModuleDefinition {
  sendAndReceive: (host: string, port: number, message: string, charset: string) => Promise<string>
}

export default SocketModule as SocketModuleDefinition
