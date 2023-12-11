import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main } from '../screens/Main';
import { Account } from '../screens/Account';
import color from '../config/color';
import { useFonts,Poppins_900Black,Poppins_400Regular } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons'
import { View,Text } from 'react-native';
import { Reports } from '../screens/Reports';
import { Vouchers } from '../screens/Vouchers';


const Tab = createBottomTabNavigator();


export const AppNavigator = () => {
    
  let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,Poppins_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  };
    
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle: { backgroundColor: '#2d3038', height: 85 },
        tabBarActiveTintColor: color.activeColor,
        tabBarLabelStyle: { fontSize: 14, marginBottom: 10, fontFamily: 'Poppins_400Regular' },
    }} >
    <Tab.Screen name="DET FMS (POS)" component={Main}  options={{
              tabBarLabel:"Main",
              headerStyle:{backgroundColor:color.bottomActiveNavigation,},
              headerTitleStyle:{fontFamily:'Poppins_400Regular',color:color.white,fontSize:20},
              tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="gas-station" size={35} color={color} />
    }} />
    <Tab.Screen name="Reports" component={Reports} options={{
         headerStyle:{backgroundColor:color.bottomActiveNavigation},
         headerTitleStyle:{fontFamily:'Poppins_400Regular',color:color.white,fontSize:20},
         tabBarIcon: ({ size, color }) => <AntDesign name="piechart" size={30} color={color} /> 
         }} />
    <Tab.Screen name="Vouchers" component={Vouchers} options={{ 
         headerStyle:{backgroundColor:color.bottomActiveNavigation},
         headerTitleStyle:{fontFamily:'Poppins_400Regular',color:color.white,fontSize:20},
        tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="file-document" size={30} color={color} /> }} />
    <Tab.Screen name="Account" component={Account}  options={{ 
         headerStyle:{backgroundColor:color.bottomActiveNavigation},
         headerTitleStyle:{fontFamily:'Poppins_400Regular',color:color.white,fontSize:20},
        tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="account-circle" size={30} color={color} /> }} />
    </Tab.Navigator>
  )
}
