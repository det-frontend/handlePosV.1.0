import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
// import Icon from "./Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";

const AppInput = ({ icon, placeholder, value, pswd, onChangeText }) => {
  return (
    <View style={styles.con}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={24} color="gray" />
        // <Icon
        // //   name={icon}
        //   size={20}
        //   iconSize={20}
        //   color="gray"
        //   bgColor={Color.light}
        // />
      )}
      <TextInput
        style={tw`py-2 pl-2 text-lg pr-7 `}
        defaultValue={value}
        placeholder={placeholder}
        secureTextEntry={pswd}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  con: {
    overflow: "hidden",
    alignItems: "center",
    padding: 3,
    fontSize: 10,
    paddingLeft: 10,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#FAEED1",
    display: "flex",
    flexDirection: "row",
  },
});
