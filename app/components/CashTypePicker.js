import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
// import Text from "../Text";
// import Button from "../Button";
// import color from "../../config/color";
// import CashPickerItem from "./CashPickerItem";
import { CustomButton } from "./LoginButton";
import CashPickerItem from "./CashPickerItem";
import tw from "twrnc";

function CashTypePicker({
  icon,
  items,
  placeholder,
  selectedItem,
  onSelectedItem,
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [payments, setPayments] = useState([
    {
      id: 1,
      method: "Cash",
      iconName: "cash",
    },
    {
      id: 2,
      method: "KBZ_Pay",
      iconName: "cellphone",
    },
    {
      id: 3,
      method: "Credit",
      iconName: "credit-card",
    },
    {
      id: 4,
      method: "Debt",
      iconName: "cash-minus",
    },
    {
      id: 5,
      method: "FOC",
      iconName: "office-building",
    },
    {
      id: 6,
      method: "Others",
      iconName: "more",
    },
  ]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View
          style={tw`bg-gray-600 flex rounded-md h-14 items-center flex flex-row text-gray-200 justify-between px-4`}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={25}
              color={"black"}
              style={tw`text-gray-300 ml-[-2px] text-[40px]`}
            />
          )}
          {selectedItem ? (
            <Text style={tw`text-gray-300 text-lg`}>{selectedItem}</Text>
          ) : (
            <Text style={tw`text-gray-200 mr-auto ml-2 font-semibold text-lg`}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={"gray"}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "#eee",
          }}
        >
          <CustomButton
            title={"Close"}
            onPress={() => setModalVisible(false)}
          ></CustomButton>
          <FlatList
            style={{
              paddingBottom: 500,
            }}
            data={payments}
            keyExtractor={(item) => item["id"].toString()}
            renderItem={({ item }) => (
              <CashPickerItem
                item={item}
                onPress={() => {
                  onSelectedItem(item);
                  setModalVisible(false);
                }}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 5,
    marginVertical: 10,
  },
  icon: {
    marginRight: 20,
  },
  text: {
    flex: 1,
  },
  placeholder: {
    color: "#eee",
    flex: 1,
  },
});

export default CashTypePicker;
