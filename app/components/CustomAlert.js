import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";

const CustomAlert = ({ visible, onClose, onOk,text }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={tw`flex-1 justify-center  items-center bg-opacity-50 bg-black`}
      >
        <View
          style={tw`bg-white overflow-hidden rounded-lg w-[60%] items-center`}
        >
          <AntDesign name="warning" style={tw`text-red-500 mt-5`} size={55} />
          <View
            style={tw` mt-1 text-center gap-1 mb-7 flex justify-center items-center`}
          >
            <Text style={tw`text-2xl font-bold text-gray-700`}>
              Are you sure?
            </Text>
            <Text style={tw`text-xl text-gray-700`}>
              {text}
            </Text>
          </View>

          <View style={tw`flex flex-row items-center`}>
            <TouchableOpacity
              onPress={onClose}
              style={tw`p-2 w-[50%] py-4 border-2 border-gray-300`}
            >
              <Text style={tw`text-white  text-center text-gray-600  text-lg`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onOk}
              style={tw`p-2 w-[50%] bg-red-500 py-4 border-2 border-red-500`}
            >
              <Text style={tw`text-white text-center text-lg`}>Sure</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
