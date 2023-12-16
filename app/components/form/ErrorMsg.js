import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

const ErrorMsg = ({ err }) => {
  return (
    <View style={tw`mt-3 text-xl text-red-500`}>
      <Text style={tw` text-lg text-red-500`}>{err}</Text>
    </View>
  );
};

export default ErrorMsg;
