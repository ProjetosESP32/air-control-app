import { Box, Button, Center, Heading } from 'native-base'
import React, { FC } from 'react'
import { useLogout } from '../../hooks/useLogout'

export const Home: FC = () => {
  const { mutate } = useLogout()

  const handleLogout = () => {
    mutate()
  }

  return (
    <Box flex={1} safeArea>
      <Center flex={1}>
        <Heading textAlign='center'>Home</Heading>
        <Button onPress={handleLogout}>Logout</Button>
      </Center>
    </Box>
  )
}
