import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const VouncherCard = ({
  renderRightActions,
  vocono,
  isOpen,
  createAt,
  totalizer_liter,
  totalPrice,
  onSwipeableOpen,
}) => {
  const utcTimestamp = createAt;
  let hour = utcTimestamp?.slice(11, 13);
  const min = utcTimestamp?.slice(14, 16);
  const sec = utcTimestamp?.slice(17, 19);
  const year = utcTimestamp?.slice(0, 4);
  const day = utcTimestamp?.slice(5, 7);
  const month = utcTimestamp?.slice(8, 10);

  let amPm = "AM";
  if (hour >= 12) {
    amPm = "PM";
    hour -= 12;
  }
  if (hour === 0) {
    hour = 12;
  }
  // console.log("===dddd=================================");
  // console.log(vocono, createAt, totalizer_liter, totalPrice);
  // console.log("====ddd================================");
  return (
    <GestureHandlerRootView style={tw`bg-[#353b48] rounded-xl my-2 `}>
      <Swipeable
        onSwipeableOpen={onSwipeableOpen}
        renderRightActions={renderRightActions}
        isOpen={isOpen}
      >
        <View style={tw` rounded-md flex gap-2 py-4`}>
          <View style={tw``}>
            <Text style={tw`pl-4 text-gray-400 text-lg`}>
              <Text style={tw`font-semibold`}> Vou No :</Text> {vocono}
            </Text>
          </View>
          <View style={tw`flex  flex-row justify-around`}>
            <Text style={tw`w-[39%]  text-center text-gray-300`}>
              {` ${year}-${month}-${day} ${hour}:${min}:${sec} ${amPm}`}
            </Text>
            <Text style={tw`w-[20%] text-center text-gray-300`}>
              {totalizer_liter?.toFixed(3)} liters
            </Text>
            <Text style={tw`w-[30%] text-center text-gray-300`}>
              {totalPrice?.toFixed(2)} mmk
            </Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default VouncherCard;
