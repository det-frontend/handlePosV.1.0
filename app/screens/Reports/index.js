import React from "react";
import { Screen } from "../../components/Screen";
import { Text, View, Dimensions } from "react-native";

import Constants from "expo-constants";
import color from "../../config/color";
import {
  useFonts,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

export const Reports = () => {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,
    Poppins_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Screen>
      <Text>Reports</Text>
      <View
        style={{
          backgroundColor: color.bottomActiveNavigation,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            color: color.white,
            fontSize: 16,
          }}
        >
          Bezier Line Chart
        </Text>
      </View>
      <View
        style={{
          backgroundColor: color.bottomActiveNavigation,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            color: color.white,
            fontSize: 16,
          }}
        >
          Bezier Line Chart
        </Text>
      </View>
    </Screen>
  );
};
