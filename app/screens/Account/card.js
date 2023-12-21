import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

const card = () => {
  return (
    <View
      style={tw`bg-gray-600 border-gray-500 border-2 rounded-md w-[180px] h-[160px] flex gap-2 justify-center items-center p-5`}
    >
     
      <Text style={tw`text-lg font-semibold text-gray-800`}>Manager</Text>
    </View>
  );
};

export default card;
