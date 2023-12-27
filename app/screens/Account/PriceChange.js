import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Screen } from "../../components/Screen";
import AppInput from "../../components/form/AppInput";

const PriceChange = ({ navigation }) => {
  return (
    <Screen>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("index")}
          style={tw`border-gray-600 border-2 mb-5 w-34 py-3 mt-2 ml-1 rounded-md`}
        >
          <View>
            <Text style={tw`text-center text-xl text-gray-500 `}>Back</Text>
          </View>
        </TouchableOpacity>
        <View style={tw`flex-1  justify-center items-center`}>
          <View
            style={tw`bg-gray-400 rounded-md p-6 px-7 flex gap-3 justify-center items-center `}
          >
            <Text style={tw`text-3xl text-gray-700  font-semibold`}>
              Price Change Form
            </Text>
            <View
              style={tw`w-[400px] mt-2 flex flex-row flex-wrap gap-5 justify-center`}
            >
              <View style={tw`w-[45%]`}>
                <Text style={tw`text-lg mb-1 ml-1 text-gray-700`}>
                  001-OctaneRone(92)
                </Text>
                <AppInput placeholder={"Price"} />
              </View>
              <View style={tw`w-[45%]`}>
                <Text style={tw`text-lg mb-1 ml-1 text-gray-700`}>
                  002-OctaneRone(95)
                </Text>
                <AppInput placeholder={"Price"} />
              </View>
              <View style={tw`w-[45%]`}>
                <Text style={tw`text-lg mb-1 ml-1 text-gray-700`}>
                  004-Diesel
                </Text>
                <AppInput placeholder={"Price"} />
              </View>
              <View style={tw`w-[45%]`}>
                <Text style={tw`text-lg mb-1 ml-1 text-gray-700`}>
                  005-Premium Diesel
                </Text>
                <AppInput placeholder={"Price"} />
              </View>
              <TouchableOpacity
                style={tw`bg-gray-700 py-4 mt-2 w-full rounded-md`}
              >
                <View>
                  <Text style={tw`text-center text-xl text-gray-400 `}>
                    Update
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default PriceChange;
