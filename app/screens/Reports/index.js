import React from 'react'
import { Screen } from '../../components/Screen'
import { Text,View,Dimensions } from 'react-native'
import { LineChart,BarChart,ProgressChart,PieChart } from 'react-native-chart-kit';
import Constants from 'expo-constants'
import color from '../../config/color';
import { useFonts,Poppins_900Black,Poppins_400Regular } from '@expo-google-fonts/poppins';

export const Reports = () => {

   let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,Poppins_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Screen>
      <Text>Reports</Text>
      <View style={{backgroundColor:color.bottomActiveNavigation,padding:20,alignItems:'center'}}>
  <Text style={{fontFamily:'Poppins_400Regular',color:color.white,fontSize:16}}>Bezier Line Chart</Text>
  <BarChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100, 
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={(Dimensions.get("screen").width - 30)} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
  <View style={{backgroundColor:color.bottomActiveNavigation,alignItems:'center'}}>
   <Text style={{fontFamily:'Poppins_400Regular',color:color.white,fontSize:16}}>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={(Dimensions.get("screen").width - 15)} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />
</View>
    </Screen>
  )
}
