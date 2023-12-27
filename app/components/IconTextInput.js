import {
  Image,
  TextInputComponent,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import color from "../config/color";
import {
  useFonts,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import tw from "twrnc";

export const IconTextInput = ({ placeholder, iconName, ...rest }) => {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,
    Poppins_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  // return ( <View style={styles.inputContainer}>
  return (
    <View style={tw`flex flex-row  items-center rounded h-15 bg-gray-600 px-4`}>
      <Ionicons name={iconName} size={32} color={color.light} />
      <TextInput
        placeholder={placeholder}
        style={tw`w-full px-3 flex items-center justify-center text-lg text-gray-800 font-bold`}
        {...rest}
      />
    </View>
  );
};
