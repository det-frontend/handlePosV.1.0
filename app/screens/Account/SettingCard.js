import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

const SettingCard = ({ img, name, link, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={tw`bg-gray-500/30 flex gap-4  w-50 rounded-md flex gap-2 justify-start items-center p-5`}
      >
        <Image
          source={img}
          style={{
            resizeMode: "cover",
            height: 50,
            width: 50,
            opacity: 50,
          }}
        />
        <Text style={tw`text-lg font-semibold text-gray-800`}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingCard;
