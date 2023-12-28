import React, { useEffect, useState } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { IconTextInput } from "./IconTextInput";
import color from "../config/color";
import { CustomButton } from "./LoginButton";
import CashTypePicker from "./CashTypePicker";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import tw from "twrnc";
const customers = [
  {
    cou_name: "Individual Customer",
    cou_id: "",
  },
];

// const categories = [
//   { label: "Cycle", value: 1 },
//   { label: "Cycle ( 3 Wheels )", value: 2 },
//   { label: "Car", value: 3 },
//   { label: "Bus ( City )", value: 4 },
//   { label: "Bus ( High Way )", value: 5 },
//   { label: "Light Truck ( City )", value: 6 },
//   { label: "Light Truck ( High way )", value: 7 },
//   { label: "Heavy Truck ( City )", value: 8 },
//   { label: "Heavy Truck ( High way )", value: 9 },
//   { label: "Trailer ( City )", value: 10 },
//   { label: "Trailer ( High way )", value: 11 },
//   { label: "Htawlargyi", value: 12 },
//   { label: "Tractor", value: 13 },
//   { label: "Small Tractor", value: 14 },
//   { label: "Heavy Machinery", value: 15 },
//   { label: "Commercial Vehicle", value: 16 },
//   { label: "Phone Tower", value: 17 },
//   { label: "Industrial Zone", value: 18 },
//   { label: "Generator Industry", value: 19 },
//   { label: "Agriculture Machine", value: 20 },
//   { label: "Generator ( Home Use )", value: 21 },
//   { label: "Hospital", value: 22 },
//   { label: "School", value: 23 },
//   { label: "Super Market", value: 24 },
//   { label: "Hotel", value: 25 },
//   { label: "Housing", value: 26 },
//   { label: "Boat", value: 27 },
//   { label: "Pump Test", value: 28 },
//   { label: "Office Use ( Bowser Car )", value: 29 },
//   { label: "Station Use", value: 30 },
// ];

function LiveCount({
  modalVisible,
  isPermit,
  permit,
  singleData,
  noz,
  setModalVisible,
  handlePermit,
  setPremitFormInfo,
  permitState,
  chooseOne,
  permitButtonDisable,
  handleErrorCon,
  printFormInfo,
  setSaleLiter,
  setSalePrice,
  nozzle1FuelDetail,
  setRealTimeEdit,
  handleRealTimeUpdate,
  realTimeEditChooseOne,
  setPrintFormInfo,
  obj,
  fetchObj,
}) {
  const [price, setPrice] = useState(0);
  const [liter, setLiter] = useState(0);
  const [cashType, setCashType] = useState(printFormInfo?.cashType);
  // const [cashType, setCashType] = useState(printFormInfo.cashType);
  const [carNo, setCarNo] = useState(printFormInfo?.carNo);
  const [customer, setCustomer] = useState({
    cou_name: printFormInfo?.customerName,
    cou_id: printFormInfo?.customerId,
    couObjId: "",
  });
  const [category, setCategory] = useState(printFormInfo?.purposeOfUse);
  // console.log(nozzle1FuelDetail);
  useEffect(() => {
    setSaleLiter(liter);
    setSalePrice(price);
  }, [price, liter]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { liter, price, nozzleNo } = nozzle1FuelDetail.current;
      if (parseInt(nozzleNo) === parseInt(printFormInfo.nozzle_no)) {
        setPrice(price);
        setLiter(liter);
      }
    }, 100); // Update the values every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setPrintFormInfo({
      nozzle_no: obj?.nozzle_no,
      objId: printFormInfo?.objId,
      vocono: fetchObj?.vocono,
      cashType: cashType,
      carNo: carNo,
      purposeOfUse: category,
      customerName: customer.cou_name,
      customerObjId: customer._id,
      customerId: customer.cou_id,
    });
  }, [cashType, carNo, customer, category]);

  let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,
    Poppins_400Regular,
  });
  const handleChange = () => {};

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // console.log("==dddd==================================");
  // console.log(isPermit);
  // console.log("====================================");

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} from>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color.bottomNavigation,
          position: "absolute",
          top: 60,
          bottom: 86,
          left: 0,
          right: 0,
          opacity: 0.8,
        }}
      ></View>
      <View
        style={tw`absolute m-5 border bg-[${color.bottomNavigation}] rounded-lg p-2 w-[360px] flex items-center top-10 left-26 bottom-14 h-[683px] z-30`}
      >
        <TouchableOpacity
          style={tw`w-30 mr-auto rounded-md bg-[${color.bottomActiveNavigation}] flex-row justify-start items-center gap-3 p-1`}
          onPress={() => setModalVisible(false)}
        >
          <Ionicons size={40} color={color.yello} name="arrow-left" />
          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "Poppins_400Regular",
              color: color.white,
              fontSize: 16,
            }}
          >
            ClOSE
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: color.white,
            textAlign: "center",
            marginVertical: 16,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Nozzle - {singleData?.nozzle_no} (Permit)
        </Text>
        {/* live data  */}
        <View>
          <View style={tw`flex flex-row gap-2 mb-2`}>
            <View
              style={tw` flex items-center justify-center rounded-md w-30 `}
            >
              {/* <Text style={tw``}>Liter</Text> */}
              <Text style={tw`text-xl text-gray-300`}>Liters</Text>
            </View>
            <View
              style={tw` flex items-center justify-center rounded-md w-50 `}
            >
              {/* <Text style={tw``}>Liter</Text> */}
              <Text style={tw`text-xl text-gray-300`}>Kyats</Text>
            </View>
          </View>
          <View style={tw`flex flex-row gap-2 mb-4`}>
            <View
              style={tw`bg-gray-700/60 border-2 border-gray-300 flex items-center justify-center rounded-md w-30 h-20`}
            >
              {/* <Text style={tw``}>Liter</Text> */}
              <Text style={tw`text-2xl text-gray-300`}>{liter}</Text>
            </View>
            <View
              style={tw`bg-gray-700/60 border-2 border-gray-300 flex items-center justify-center rounded-md w-50 h-20`}
            >
              {/* <Text style={tw``}>Liter</Text> */}
              <Text style={tw`text-2xl text-gray-300`}>{price}</Text>
            </View>
          </View>
        </View>

        <View style={tw`w-[96%] flex gap-2`}>
          <IconTextInput
            placeholder="Customer Name"
            iconName={"email"}
            onChangeText={handleChange("emailOrUsername")}
            placeholderTextColor={color.white}
          />
          <IconTextInput
            placeholder="Customer Id"
            iconName={"email"}
            onChangeText={handleChange("emailOrUsername")}
            placeholderTextColor={color.white}
          />
          <CashTypePicker
            icon={"cash"}
            placeholder={"Cash Type"}
            selectedItem={cashType}
            onSelectedItem={(item) => setCashType(item.method)}
          />
          <IconTextInput
            placeholder="Car No"
            iconName={"car"}
            onChangeText={handleChange("emailOrUsername")}
            placeholderTextColor={color.white}
          />
          <CustomButton
            title={"Update"}
            onPress={handleRealTimeUpdate}
            style={{ backgroundColor: color.activeColor }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default LiveCount;
