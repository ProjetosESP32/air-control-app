import { AspectRatio, Box, Heading, ScrollView, useTheme, VStack } from 'native-base'
import React, { FC } from 'react'
import { Dimensions } from 'react-native'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'

const { width, height } = Dimensions.get('screen')

export const Home: FC = () => {

  const { colors } = useTheme()

  const barchartdata = { // variavel de dados provisórios - barchart
    labels: ["Sala 1", "Sala 2", "Sala 3"],
    datasets: [
      {
        data: [26, 25, 28]
      }
    ]
  };

  const piechartdata = [
    {
      name: "Seoul",
      population: 21500000,
      color: colors.primary[300],
      legendFontColor: colors.primary[400],
      legendFontSize: 12
    },
    {
      name: "Toronto",
      population: 2800000,
      color: colors.primary[400],
      legendFontColor: colors.primary[300],
      legendFontSize: 12
    }
  ];

  return (
    <Box flex={1} safeArea>
      <ScrollView flex={1}>
        <VStack space={2} m={4} p={2} rounded='lg' shadow={1} bg='light.100'>
          <Heading>Gráficos</Heading>
          <AspectRatio ratio={{ base: 1 }}>
            <LineChart
              width={width * 0.85}
              height={height * 0.4}
              data={{ labels: ['asasd'], datasets: [{ data: [30, 20, 10] }] }}
              chartConfig={{
                color: () => colors.primary[400],
              }}
              bezier
            />
          </AspectRatio>
          <AspectRatio ratio={{ base: 1 }}>
            <BarChart
              yAxisSuffix='' // label lado direito dos valores do eixo y
              yAxisLabel='' // label lado esquerdo dos valores do eixo y
              height={height * 0.4}
              width={width * 0.85}
              chartConfig={{ color: () => colors.primary[400] }}
              data={barchartdata}

            />
          </AspectRatio>
          <AspectRatio ratio={{ base: 1 }}>
            {/* <PieChart // terminar de implementar este piechart - descobrir pq ta dando erro.
              data={piechartdata}
              height={height * 0.4}
              width={width * 0.85}
              paddingLeft='10'
              chartConfig={{
                color: () => colors.primary[400]
              }}
              accessor={"sala"}
              backgroundColor={"grey"}

            /> */}
          </AspectRatio>
        </VStack>
      </ScrollView>
    </Box>
  )
}
