import { AspectRatio, Box, Heading, ScrollView, useTheme, VStack } from 'native-base'
import React, { FC } from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const { width, height } = Dimensions.get('screen')

export const Home: FC = () => {
  const { colors } = useTheme()
  return (
    <Box flex={1} safeArea>
      <ScrollView flex={1}>
        <VStack space={2} m={4} p={2} rounded='lg' shadow={1} bg='light.100'>
          <Heading>Gráficos</Heading>
          <AspectRatio ratio={{ base: 1 }}>
            <LineChart
              width={width * 0.8}
              height={height}
              data={{ labels: ['asasd'], datasets: [{ data: [90, 44, 55] }] }}
              chartConfig={{
                color: () => colors.primary[500],
              }}
            />
          </AspectRatio>
        </VStack>
      </ScrollView>
    </Box>
  )
}
