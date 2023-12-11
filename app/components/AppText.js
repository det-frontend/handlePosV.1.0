import React from 'react'
import { useFonts, Montserrat_900Black,Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Text } from 'react-native'
import color from '../config/color';

export const AppText = ({text,family}) => {
  let [fontsLoaded, fontError] = useFonts({ Montserrat_900Black,Montserrat_600SemiBold });

  if (!fontsLoaded && !fontError) {
    return null
  }
  return (
    <Text style={{ fontFamily: family, fontSize: 27,color:color.activeColor,textTransform:'uppercase' }}>{text}</Text>
  )
}
