//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// create a component
const CashPickerItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 5,
      }}
      onPress={onPress}
    >
      <View
        style={{
          padding: 15,
          color: "white",
          borderRadius: 5,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#353b48",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <MaterialCommunityIcons name={"cash"} size={30} color="#eee" />
          <Text
            style={{
              color: "white",
              fontWeight: 200,
            }}
          >
            Cash Type - {item["method"]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default CashPickerItem;
