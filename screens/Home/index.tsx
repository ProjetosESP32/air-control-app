import { useQuery } from '@tanstack/react-query'
import { Box, Heading, ScrollView, Text, VStack, useTheme } from 'native-base'
import React, { FC } from 'react'
import { useWindowDimensions } from 'react-native'
import { Circle, Svg } from 'react-native-svg'
import { VictoryBar, VictoryChart, VictoryLine, VictoryPie } from 'victory-native'
import { Home as HomeData } from '../../types/Home'
import { api } from '../../utils/api'

export const Home: FC = () => {
  const { width } = useWindowDimensions()
  const { colors } = useTheme()
  const { data } = useQuery(['home'], async ({ signal }) => (await api.get<HomeData>('v1/home', { signal })).data)

  const chartBoxSize = width * 0.85

  return (
    <Box flex={1} safeArea>
      <ScrollView flex={1}>
        <VStack space={4} m={4} p={2} rounded='lg' shadow={1} bg='light.100' alignItems='center'>
          <Heading>Home</Heading>
          <Text>Dados de consumo do sistema</Text>
          <Box>
            <Text color='primary.400' fontWeight='bold' textAlign='center'>
              Consumo atual (kwh)
            </Text>
            {data && data.consumptionNow.length > 0 ? (
              <VictoryPie
                width={chartBoxSize}
                data={data?.consumptionNow.map(({ block, potency }) => ({ x: block, y: potency }))}
              />
            ) : (
              <Box w='100%' p={2} style={{ aspectRatio: 1 }}>
                <Svg width='100%' height='100%' viewBox='0 0 2 2'>
                  <Circle r={1} cx={1} cy={1} fill={colors.gray[200]} />
                </Svg>
                <Text textAlign='center'>Sem dados</Text>
              </Box>
            )}
          </Box>
          <Box>
            <Text color='primary.400' fontWeight='bold' textAlign='center'>
              Consumo diário (kwh)
            </Text>
            <VictoryChart width={chartBoxSize} minDomain={{ y: 0 }}>
              <VictoryLine
                data={data?.dailyConsumption.map(({ hour, totalPotency }) => ({ x: hour, y: totalPotency }))}
              />
            </VictoryChart>
            {data && data.dailyConsumption.length === 0 ? <Text textAlign='center'>Sem dados</Text> : null}
          </Box>
          <Box>
            <Text color='primary.400' fontWeight='bold' textAlign='center'>
              Consumo mensal (kwh)
            </Text>
            <VictoryChart width={chartBoxSize} domainPadding={{ x: 13 }}>
              <VictoryBar
                alignment='middle'
                categories={{ x: Array.from({ length: 12 }, (_, i) => String(i + 1)) }}
                data={data?.monthConsumption.map(({ month, totalPotency }) => ({
                  x: month + 1,
                  y: totalPotency,
                }))}
                barRatio={0.8}
              />
            </VictoryChart>
            {data && data.monthConsumption.length === 0 ? <Text textAlign='center'>Sem dados</Text> : null}
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  )
}
