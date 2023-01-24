import { useNavigation } from '@react-navigation/native'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Box, Divider, FlatList, Heading, HStack, Spinner, Text, VStack } from 'native-base'
import React, { FC, useCallback } from 'react'
import { ListRenderItemInfo, Pressable, StyleSheet } from 'react-native'
import { useUser } from '../../hooks/useUser'
import { Paginate } from '../../types/Paginate'
import { Room } from '../../types/Room'
import { BottomTabNavigation } from '../../types/TabRoutes'
import { api } from '../../utils/api'

export const UserRooms: FC = () => {
  const { data: user } = useUser()
  const {
    data: rooms,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['rooms'],
    async ({ pageParam, signal }) => {
      const pageParamUrl: string = pageParam ? String(pageParam) : ''
      const { data } = await api.get<Paginate<Room>>(`v1/rooms${pageParamUrl}`, { signal })

      return data
    },
    {
      getPreviousPageParam: ({ meta: { previousPageUrl } }) => previousPageUrl ?? undefined,
      getNextPageParam: ({ meta: { nextPageUrl } }) => nextPageUrl ?? undefined,
      enabled: !!user?.isRoot,
    },
  )
  const navigation = useNavigation<BottomTabNavigation<'UserRooms'>>()

  const roomsToRender: Room[] = (user?.isRoot ? rooms?.pages.flatMap(({ data }) => data) : user?.rooms) ?? []

  const renderItem = useCallback(
    ({ item: { id, name, block, floor } }: ListRenderItemInfo<Room>) => (
      <Pressable onPress={() => navigation.navigate('Control', { roomId: id })}>
        <VStack py={2}>
          <Heading>{name}</Heading>
          <HStack justifyContent='space-between'>
            <Text>Bloco: {block}</Text>
            <Text>Piso: {floor}</Text>
          </HStack>
        </VStack>
      </Pressable>
    ),
    [navigation],
  )

  const fetchMoreOnEnd = () => {
    void fetchNextPage()
  }

  return (
    <Box flex={1} safeArea>
      <VStack flex={1} space={2} m={4} p={2} rounded='lg' shadow={1} bg='light.100'>
        <Heading>Salas que você tem acesso</Heading>
        <Text>Clique em uma para acessar o controle</Text>
        <FlatList
          data={roomsToRender}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          flex={1}
          bg='light.50'
          rounded='md'
          shadow={1}
          contentContainerStyle={styles.flatListContentContainer}
          onEndReached={fetchMoreOnEnd}
          ListFooterComponent={() => (isFetchingNextPage ? <Spinner /> : null)}
        />
      </VStack>
    </Box>
  )
}

const ItemSeparator = () => <Divider />

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 8,
  },
})
