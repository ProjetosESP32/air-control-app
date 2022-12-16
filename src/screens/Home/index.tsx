import chroma from 'chroma-js'
import { Box, Heading, ScrollView, VStack, useTheme } from 'native-base'
import React, { FC } from 'react'
import { useWindowDimensions } from 'react-native'
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit'
import { useHome } from '../../hooks/useHome'
import { ColorHues } from '../../utils/color'
import { getMonthsByNumber } from '../../utils/date'

export const Home: FC = () => {
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const { data } = useHome()

  const chartBoxSize = width * 0.85

  const getColor = (opacity = 1) => chroma(colors.primary[600]).alpha(opacity).hex()

  const lineChartData = {
    labels: data?.dailyConsumption.map(({ hour }) => `${hour}H`) ?? [],
    datasets: [
      {
        data: data?.dailyConsumption.map(({ totalPotency }) => totalPotency) ?? [],
        strokeWidth: 2,
        color: getColor,
      },
    ],
  }

  const barChartData = {
    labels: data?.monthConsumption.map(({ month }) => getMonthsByNumber(month)) ?? [],
    datasets: [
      {
        data: data?.monthConsumption.map(({ totalPotency }) => totalPotency) ?? [],
        color: getColor,
      },
    ],
  }

  const pieCharData =
    data?.consumptionNow.map(({ block, potency }, index) => ({
      name: `Bloco ${block.toUpperCase()}`,
      potency,
      color: colors.primary[(100 * ((index + 1) % 9)) as ColorHues],
    })) ?? []

  return (
    <Box flex={1} safeArea>
      <ScrollView flex={1}>
        <VStack space={2} m={4} p={2} rounded='lg' shadow={1} bg='light.100'>
          <Heading>Gráficos</Heading>
          {data && data.dailyConsumption.length > 0 ? (
            <LineChart
              width={chartBoxSize}
              height={chartBoxSize}
              data={lineChartData}
              bezier
              chartConfig={{ color: () => colors.primary[400] }}
            />
          ) : null}
          {data && data.monthConsumption.length > 0 ? (
            <BarChart
              yAxisSuffix='' // label lado direito dos valores do eixo y
              yAxisLabel='' // label lado esquerdo dos valores do eixo y
              height={chartBoxSize}
              width={chartBoxSize}
              chartConfig={{ color: () => colors.primary[400] }}
              data={barChartData}
            />
          ) : null}
          {pieCharData.length > 0 ? (
            <PieChart
              data={pieCharData}
              height={chartBoxSize}
              width={chartBoxSize}
              paddingLeft='15'
              accessor='potency'
              backgroundColor={colors.white}
            />
          ) : null}
        </VStack>
      </ScrollView>
    </Box>
  )
}
