import Socket from 'react-native-tcp-socket'

export const send = async (data: string): Promise<string> => {
  const client = Socket.createConnection({ port: 5000, host: '192.168.1.1', interface: 'wifi' }, () => {
    client.write(data)
  })

  return await new Promise((resolve, reject) => {
    client.on('data', received => {
      const data = typeof received === 'string' ? received : received.toString()

      resolve(data)
      client.destroy()
    })

    client.on('error', err => {
      reject(err)
    })
  })
}
