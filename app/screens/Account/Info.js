import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Screen } from "../../components/Screen";
import AppInput from "../../components/form/AppInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../../components/CustomAlert";

const Info = ({ navigation }) => {
  const [edit, setEdit] = useState(false);
  const [read, setRead] = useState();
  const [station, setStation] = useState();
  const [ph_1, setPh_1] = useState(read?.ph_1);
  const [ph_2, setPh_2] = useState(read?.ph_2);

  const [showAlert, setShowAlert] = useState(false);

  const handleOk = () => {
    removeValue(), getData(), console.log("remove");
    // Handle 'Ok' button press logic here
    setShowAlert(false);
  };

  const handleClose = () => {
    // Handle 'Cancel' button press logic here
    setShowAlert(false);
  };

  const data = {
    station: station,
    ph_1: ph_1,
    ph_2: ph_2,
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("info", jsonValue);
    } catch (e) {
      // saving error
      console.log("set err");
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("info");
      setRead(JSON.parse(jsonValue));
      console.log(JSON.parse(jsonValue));
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("get err");
    }
  };

  useEffect(() => {
    getData();
  }, [edit]);

  const removeValue = async () => {
    try {
      // await AsyncStorage.clear();
      await AsyncStorage.removeItem("info");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  // const show =
  //   get_data?.station != null &&
  //   get_data?.ph_1 != null &&
  //   get_data?.ph_2 != null;

  console.log("===tt=================================");
  console.log(read);
  console.log(data);
  console.log("===tt=================================");
  // console.log(getData);
  const image = require("../../../assets/197.jpg");
  return (
    <Screen>
      <CustomAlert
        text="Remove your information"
        visible={showAlert}
        onOk={handleOk}
        onClose={handleClose}
      />
      <ScrollView>
        {/* <View style={tw`w-[100%]`}>
          <Image style={tw`h-[200px]`} resizeMode="center" source={image} />
        </View> */}
        <View style={{ width: "100%", height: 200, marginBottom: 20 }}>
          <Image
            style={{ flex: 1, width: undefined, height: undefined }}
            resizeMode="cover"
            source={image}
          />
        </View>

        <View style={tw`bg-[#353b48] mx-auto flex py-5 items-center w-full`}>
          <Text style={tw` text-3xl text-gray-400`}>
            {read ? read.station : "....."}
          </Text>
        </View>

        <View
          style={tw`  mx-auto flex-row justify-between flex mt-3 items-center w-full`}
        >
          <View style={tw`bg-[#353b48] w-[48%] flex p-4 items-center`}>
            <Text style={tw` text-xl text-gray-400`}>
              {read ? read.ph_1 : "....."}
            </Text>
          </View>
          <View style={tw`bg-[#353b48] w-[48%] flex p-4 items-center`}>
            <Text style={tw` text-xl text-gray-400`}>
              {read ? read.ph_2 : "....."}
            </Text>
          </View>
        </View>

        <View
          style={tw`bg-[#353b48] p-4 flex flex-row justify-between  mx-auto mt-3 gap-2 flex p-4 w-full`}
        >
          <TouchableOpacity
            style={tw`w-[48%]`}
            onPress={() => navigation.navigate("index")}
          >
            <Text
              style={tw`text-center text-gray-800 font-bold border-2 border-gray-800 px-6 py-3 rounded-md text-xl`}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-[48%]`}
            onPress={() => setEdit((edit) => !edit)}
          >
            <Text
              style={tw`text-center text-gray-500 border-2 border-gray-800 bg-gray-800 px-6 py-3 rounded-md text-xl`}
            >
              {read ? "Edit" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
        {edit && (
          <View
            style={tw`bg-[#353b48]  mx-auto mt-5 flex p-4 py-8  items-center w-full`}
          >
            <View style={tw`bg-gray-600  rounded-lg  text-center py-14 px-16`}>
              <Text
                style={tw`text-3xl text-center mt-[-15px]  text-gray-800 font-bold`}
              >
                Station Info
              </Text>
              <View style={tw`mt-5 flex gap-3`}>
                <AppInput
                  value={read?.station}
                  icon="home"
                  placeholder={"Station Name"}
                  onChangeText={(e) => setStation(e)}
                />
                <AppInput
                  value={read?.ph_1}
                  icon="phone"
                  placeholder={"Station Phone"}
                  onChangeText={(e) => setPh_1(e)}
                />
                <AppInput
                  value={read?.ph_2}
                  icon="phone"
                  placeholder={"Manager Phone"}
                  onChangeText={(e) => setPh_2(e)}
                />
                <TouchableOpacity
                  onPress={() => {
                    storeData(data);
                    setEdit(false);
                  }}
                >
                  <Text
                    style={tw`mx-auto mt-1 py-3 w-[100%] text-lg text-gray-500 font-semibold rounded-md bg-gray-800 text-center`}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {/* <TouchableOpacity
          style={tw`w-[32%]`}
          onPress={() => {
            removeValue(), getData(), console.log("remove");
          }}
        >
          <Text
            style={tw`text-center mt-4 text-gray-400 border-2 border-gray-800 bg-gray-800 px-6 py-3 rounded-md text-xl`}
          >
            remove
          </Text>
        </TouchableOpacity> */}
        {read && (
          <TouchableOpacity
            style={tw`w-[100%]`}
            onPress={() => setShowAlert(true)}
          >
            <Text
              style={tw`text-center mt-4 text-red-400/70 border-2 border-red-400/50  px-6 py-3 rounded-md text-xl`}
            >
              Remove Information
            </Text>
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity style={tw`w-[32%]`} onPress={() => storeData(data)}>
          <Text
            style={tw`text-center mt-4 text-gray-400 border-2 border-gray-800 bg-gray-800 px-6 py-3 rounded-md text-xl`}
          >
            store
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={tw`w-[32%]`}
          onPress={() => setShowAlert(true)}
        >
          <Text
            style={tw`text-center mt-4 text-gray-400 border-2 border-gray-800 bg-gray-800 px-6 py-3 rounded-md text-xl`}
          >
            alert
          </Text>
        </TouchableOpacity> */}
      </ScrollView>
    </Screen>
  );
};

export default Info;
