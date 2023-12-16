import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../../components/Screen";
import color from "../../config/color";
import LottieView from "lottie-react-native";
import tw from "twrnc";
import AppInput from "../../components/form/AppInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert";
import AuthContext from "../../auth/context";
import authStorage from "../../auth/storage";

export const Account = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  const handleOk = () => {
    setUser(null);
    authStorage.removeToken();
    // Handle 'Ok' button press logic here
    setShowAlert(false);
  };

  const handleClose = () => {
    // Handle 'Cancel' button press logic here
    setShowAlert(false);
  };
  return (
    <Screen style={tw`flex items-center justify-center`}>
      <CustomAlert
        text="Logout your account"
        visible={showAlert}
        onOk={handleOk}
        onClose={handleClose}
      />
      <ScrollView>
        <View
          style={tw`w-[100%] bg-[#353b48] p-5 flex flex-col justify-around flex-wrap`}
        >
          <View style={tw`flex items-center flex-row justify-between px-5`}>
            <Text style={tw`text-3xl text-gray-400`}>User Roles</Text>
            <View style={tw`flex flex-row gap-3 items-center`}>
              <TouchableOpacity onPress={() => navigation.navigate("info")}>
                <Text
                  style={tw` py-3 px-5 text-lg text-gray-800 font-semibold rounded-md bg-gray-500 text-center`}
                >
                  Station Info
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowAlert(true)}>
                <Text
                  style={tw` py-2 pl-3 pr-2 text-lg  font-semibold rounded-md border border-red-500 text-center`}
                >
                  <MaterialIcons
                    name="logout"
                    size={24}
                    style={tw`text-red-500`}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={tw`w-[100%] p-5 flex flex-row justify-between px-5 flex-wrap`}
          >
            <View
              style={tw`bg-gray-600 border-gray-500 border-2 rounded-md w-[180px] h-[160px] flex gap-2 justify-center items-center p-5`}
            >
              <LottieView
                autoPlay
                loop
                // style={{
                //   width: "90%",
                //   height: "90%",
                //   backgroundColor: color.bottomActiveNavigation,
                // }}
                style={tw`h-[100px]`}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require("../../../assets/mm.json")}
              />
              <Text style={tw`text-lg font-semibold text-gray-800`}>
                Manager
              </Text>
            </View>
            <View
              style={tw`bg-black/20 border-gray-500/50 border-2 rounded-md w-[180px] h-[160px] flex gap-2 justify-center items-center p-5`}
            >
              <Text style={tw`text-lg  font-semibold text-gray-500/50`}>
                Coming Soon ...
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};
