import React from 'react'
import Constants from 'expo-constants'
import { SafeAreaView } from 'react-native'
import color from '../config/color'

export const Screen = ({children,backgroundColor}) => {
  return (
      <SafeAreaView style={{
          paddingTop: Constants.statusBarHeight,
          backgroundColor:color.bottomNavigation,
          flex: 1,
          paddingHorizontal:10,
          overflow:'hidden',
          position:'relative'
      }}>{children}</SafeAreaView>
  )
}
