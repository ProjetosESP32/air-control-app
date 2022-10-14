import { Box, Divider, FlatList, Heading, HStack, Text, VStack } from 'native-base'
import React, { FC, useCallback } from 'react'
import { ListRenderItemInfo, StyleSheet } from 'react-native'
import { useUser } from '../../hooks/useUser'
import { Room } from '../../types/Room'

export const UserRooms: FC = () => {
  const { data } = useUser()

  const renderItem = useCallback(
    ({ item: { id, name, block, floor } }: ListRenderItemInfo<Room>) => (
      <VStack py={2}>
        <Heading>
          {name}
        </Heading>
        <HStack justifyContent='space-between'>
          <Text>Bloco: {block}</Text>
          <Text>Piso: {floor}</Text>
        </HStack>
      </VStack>
    ),
    [],
  )

  return (
    <Box flex={1} safeArea bg='light.200'>
      <VStack flex={1} space={2} m={4} p={2} rounded='lg' shadow={1} bg='light.100'>
        <Heading>Salas que você tem acesso</Heading>
        <Text>Clique em uma para acessar o controle</Text>
        <FlatList
          data={data?.rooms ?? []}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          flex={1}
          bg='light.50'
          rounded='md'
          shadow={1}
          contentContainerStyle={styles.flatListContentContainer}
        />
      </VStack>
    </Box>
  )
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 8,
  },
})
