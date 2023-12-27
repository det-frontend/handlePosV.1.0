import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ImageInput = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      storeData(result.assets[0].uri);
      getData();
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("image", value);
    } catch (e) {
      console.log("===ddd=================================");
      console.log("set err");
      console.log("====================================");
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("image");
      if (value !== null) {
        // value previously stored
        console.log("=ddd===================================");
        console.log(value);
        console.log("====================================");
        setImage(value);
      }
    } catch (e) {
      // error reading value
      console.log("====================================");
      console.log("get err");
      console.log("====================================");
    }
  };
  useEffect(() => {
    getData();
  },[]);

  return (
    <TouchableOpacity onPress={pickImage}>
      <View
        style={tw`w-50 h-50 rounded flex justify-center border border-gray-500 rounded-md items-center`}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={tw`w-full h-[100%]`}
          />
        ) : (
          <MaterialIcons
            name="add-photo-alternate"
            size={24}
            style={tw`text-gray-500 text-[4rem]`}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ImageInput;
