import { NativeModules } from 'react-native'

interface SocketModuleDefinition {
  sendAndReceive: (host: string, port: number, message: string, charset: string) => Promise<string>
}

const SocketModule = NativeModules.SocketModule as SocketModuleDefinition

export class Socket {
  constructor(
    private readonly host: string,
    private readonly port: number,
  ) {}

  public async sendAndReceive(message: string, charset: string) {
    return await SocketModule.sendAndReceive(this.host, this.port, message, charset)
  }
}
