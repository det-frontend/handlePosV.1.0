import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";

const SwipPrint = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={tw`bg-blue-200 w-[90px] flex justify-center items-center`}>
        <AntDesign style={tw`text-blue-500`} name="printer" size={40} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SwipPrint;
