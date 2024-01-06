import React, { useEffect, useState } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { IconTextInput } from "./IconTextInput";
import color from "../config/color";
import { CustomButton } from "./LoginButton";
// import CashTypePicker from "./CashTypePicker";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import tw from "twrnc";
import Loader from "./Loader";
const customers = [
  {
    cou_name: "Individual Customer",
    cou_id: "",
  },
];

const categories = [
  { label: "Cycle", value: 1 },
  { label: "Cycle ( 3 Wheels )", value: 2 },
  { label: "Car", value: 3 },
  { label: "Bus ( City )", value: 4 },
  { label: "Bus ( High Way )", value: 5 },
  { label: "Light Truck ( City )", value: 6 },
  { label: "Light Truck ( High way )", value: 7 },
  { label: "Heavy Truck ( City )", value: 8 },
  { label: "Heavy Truck ( High way )", value: 9 },
  { label: "Trailer ( City )", value: 10 },
  { label: "Trailer ( High way )", value: 11 },
  { label: "Htawlargyi", value: 12 },
  { label: "Tractor", value: 13 },
  { label: "Small Tractor", value: 14 },
  { label: "Heavy Machinery", value: 15 },
  { label: "Commercial Vehicle", value: 16 },
  { label: "Phone Tower", value: 17 },
  { label: "Industrial Zone", value: 18 },
  { label: "Generator Industry", value: 19 },
  { label: "Agriculture Machine", value: 20 },
  { label: "Generator ( Home Use )", value: 21 },
  { label: "Hospital", value: 22 },
  { label: "School", value: 23 },
  { label: "Super Market", value: 24 },
  { label: "Hotel", value: 25 },
  { label: "Housing", value: 26 },
  { label: "Boat", value: 27 },
  { label: "Pump Test", value: 28 },
  { label: "Office Use ( Bowser Car )", value: 29 },
  { label: "Station Use", value: 30 },
];

function Preset({
  setReadyState,
  modalVisible,
  setModalVisible,
  handleReadyPermit,
  icon,
  placeholder,
  handleReadyState,
  selectedItem,
  onSelectedItem,
  chooseOne,
  setReadyStateObj,
  obj,
  setPremitFormInfo,
  presetButtonDisable,
  Loading,
  ...otherProps
}) {
  const [readyStateItem, setReadyStateItem] = useState("kyat");
  const [customer, setCustomer] = useState(customers[0]);
  const [category, setCategory] = useState({ label: "Cycle", value: 1 });
  const [carNo, setCarNo] = useState(" ");
  const [paymentNo, setPyamentNo] = useState("Cash");
  const [numberValue, setNumberValue] = useState("");
  const [lNeed, setLNeed] = useState(false);
  console.log("===load=================================");
  console.log(Loading);
  console.log("====================================");

  const handleCarNo = (text) => {
    setCarNo(text);
  };
  const handleChange = () => {};

  useEffect(() => {
    if (readyStateItem == "liter") {
      setLNeed(true);
      //     setReadyStateObj({
      //         depNo:obj.dep_no,
      //         nozzleNo: obj.nozzle_no,
      //         fuelType: obj.fuel_type,
      //         type: readyStateItem,
      //         carNo: carNo,
      //         vehicleType: category.label,
      //         cashType: paymentNo,
      //         salePrice: obj.daily_price,
      //         value: numberValue,
      //         couObjId: customer._id,
      //         couName: customer.cou_name,
      //         cou_id: customer.cou_id,
      //     });

      //      setPremitFormInfo({
      //     couObjId: customer._id,
      //     couName: customer.cou_name,
      //     cou_id: customer.cou_id,
      //     vehicleType: category.label,
      //     carNo: carNo,
      //     cashType: paymentNo
      // });

      // if (parseFloat(numberValue) % 1 !== 0) {
      // setLNeed(false);

      setPremitFormInfo({
        couObjId: customer._id,
        couName: customer.cou_name,
        cou_id: customer.cou_id,
        vehicleType: category.label,
        carNo: carNo,
        cashType: paymentNo,
        type: readyStateItem,
        value: numberValue,
      });
      // } else {
      //     setLNeed(true);
      // }
    }

    if (readyStateItem == "kyat") {
      setLNeed(false);
      // setReadyStateObj({
      //     depNo:obj.dep_no,
      //     nozzleNo: obj.nozzle_no,
      //     fuelType: obj.fuel_type,
      //     type: readyStateItem,
      //     carNo: carNo,
      //     vehicleType: category.label,
      //     cashType: paymentNo,
      //     salePrice: obj.daily_price,
      //     value: numberValue,
      //     couObjId: customer._id,
      //     couName: customer.cou_name,
      //     cou_id: customer.cou_id,
      // });

      setPremitFormInfo({
        couObjId: customer._id,
        couName: customer.cou_name,
        cou_id: customer.cou_id,
        vehicleType: category.label,
        carNo: carNo,
        cashType: paymentNo,
        type: readyStateItem,
        value: numberValue,
      });
    }
  }, [readyStateItem, customer, category, carNo, paymentNo, numberValue]);

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
          onPress={() => {
            setModalVisible(false), setReadyState(false);
          }}
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
          Nozzle - {obj?.nozzle_no} (Permit)
        </Text>
        {/* live data  */}
        <View style={tw`w-[96%] flex gap-2`}>
          <IconTextInput
            placeholder="Price"
            iconName={"tag-text"}
            onChangeText={(value) => setNumberValue(value)}
            placeholderTextColor={color.white}
          />
          <IconTextInput
            placeholder="Customer Name"
            iconName={"email"}
            onChangeText={(customer) => setCustomer(customer)}
            placeholderTextColor={color.white}
          />
          <IconTextInput
            placeholder="Customer Id"
            iconName={"account"}
            onChangeText={(customer) => setCustomer(customer)}
            placeholderTextColor={color.white}
          />
          {/* <CashTypePicker
            icon={"cash"}
            placeholder={"Cash Type"}
            selectedItem={cashType}
            onSelectedItem={(item) => setCashType(item.method)}
          /> */}
          <IconTextInput
            placeholder="Car No"
            onSearch={handleCarNo}
            iconName={"car"}
            onChangeText={handleChange("emailOrUsername")}
            placeholderTextColor={color.white}
          />
          <CustomButton
            title={"Preset"}
            style={{ backgroundColor: color.activeColor }}
            onPress={handleReadyState}
          />
        </View>
      </View>
    </Modal>
  );
}

export default Preset;
