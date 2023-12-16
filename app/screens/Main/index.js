import React, { useState } from "react";
import { Image, Text, View, Modal, TouchableOpacity } from "react-native";
import { Screen } from "../../components/Screen";
import color from "../../config/color";
import {
  useFonts,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import Constants from "expo-constants";
import { IconTextInput } from "../../components/IconTextInput";
import PermitComponent from "../../components/PermitComponent";

export const Main = () => {
  const [modalVisible, setModalVisible] = useState(false);
  let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,
    Poppins_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const numbers = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
  ];

  const handleChange = () => {};

  return (
    <Screen>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          rowGap: 3,
        }}
      >
        {numbers.map((e, index) => (
          <View
            style={{
              height: 90,
              width: "19.5%",
              backgroundColor: color.bottomActiveNavigation,
              borderRadius: 10,
              gap: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible((prev) => !prev)}>
              <Image
                width={9}
                height={9}
                style={{ width: 150, height: 150 }}
                source={require("../../../assets/pump.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                position: "absolute",
                top: 5,
                fontWeight: "100",
                color: color.white,
                fontFamily: "Poppins_400Regular",
              }}
            >
              {e}
            </Text>
          </View>
        ))}

        <PermitComponent
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </View>
    </Screen>
  );
};
