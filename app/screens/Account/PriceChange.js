import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Screen } from "../../components/Screen";
import AppInput from "../../components/form/AppInput";
import PriceChangeApi from "../../api/PriceChange";

const PriceChange = ({ navigation }) => {
  const [ninetyTwo, setNinetyTwo] = useState("");
  const [ninetyFive, setNinetyFive] = useState("");
  const [hsd, setHsd] = useState("");
  const [phsd, setPhsd] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [ninetyTwoError, setNinetyTwoError] = useState(false);
  const [ninetyFiveError, setNinetyFiveError] = useState(false);
  const [hsdError, setHsdError] = useState(false);
  const [phsdError, setPhsdError] = useState(false);

  console.log(ninetyFive, ninetyTwo, hsd, phsd);

  const handleChange = (e) => {
    if (ninetyTwo.length == 0) {
      setNinetyTwoError(true);
    }
    if (ninetyFive.length == 0) {
      setNinetyFiveError(true);
    }
    if (hsd.length == 0) {
      setHsdError(true);
    }
    if (phsd.length == 0) {
      setPhsdError(true);
    }

    if (
      ninetyTwo.length > 0 &&
      ninetyFive.length > 0 &&
      hsd.length > 0 &&
      phsd.length > 0
    ) {
      setNinetyTwoError(false);
      setNinetyFiveError(false);
      setHsdError(false);
      setPhsdError(false);

      const priceChangeObj = {
        ninety_two: ninetyTwo,
        ninety_five: ninetyFive,
        HSD: hsd,
        PHSD: phsd,
      };

      const fetchIt = async (priceChangeObj) => {
        setLoading(true);
        const response = await PriceChangeApi.priceChange(priceChangeObj);

        console.log(response);
        if (response.data.result) {
          setSuccess(true);
          setNinetyTwo("");
          setNinetyFive("");
          setHsd("");
          setPhsd("");
        }
        setLoading(false);
      };

      fetchIt(priceChangeObj);
    }

    // console.log(priceChangeObj);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSuccess(false);
    }, 2000); // Update the values every second

    return () => {
      clearInterval(interval);
    };
  }, [success]);

  return (
    <Screen>
      <ScrollView>
        <View style={tw`flex flex-row`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("index")}
            style={tw`border-gray-600 border-2 mb-5 mr-[100px] w-34 py-3 mt-2 ml-1 rounded-md`}
          >
            <View>
              <Text style={tw`text-center text-xl  text-gray-500 `}>Back</Text>
            </View>
          </TouchableOpacity>
          {success && (
            <View
              style={tw`border-green-600  border-2 mb-5 w-40 py-3 mt-2 ml-1 rounded-md`}
            >
              <View>
                <Text style={tw`text-center text-xl text-green-500 `}>
                  Success !
                </Text>
              </View>
            </View>
          )}
        </View>

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
                {ninetyTwoError && (
                  <Text style={tw`text-lg mb-1 ml-1 text-red-500`}>
                    This field is required
                  </Text>
                )}

                <AppInput
                  onChangeText={(value) => setNinetyTwo(value)}
                  placeholder={"Price"}
                  value={ninetyTwo}
                />
              </View>
              <View style={tw`w-[45%]`}>
                <Text style={tw`text-lg mb-1 ml-1 text-gray-700`}>
                  002-OctaneRone(95)
                </Text>
                {ninetyFiveError && (
                  <Text style={tw`text-lg mb-1 ml-1 text-red-500`}>
                    This field is required
                  </Text>
                )}
                <AppInput
                  onChangeText={(value) => setNinetyFive(value)}
                  placeholder={"Price"}
                  value={ninetyFive}
                />
              </View>
              <View style={tw`w-[45%]`}>
                <Text style={tw`text-lg mb-1 ml-1 text-gray-700`}>
                  004-Diesel
                </Text>
                {hsdError && (
                  <Text style={tw`text-lg mb-1 ml-1 text-red-500`}>
                    This field is required
                  </Text>
                )}
                <AppInput
                  onChangeText={(value) => setHsd(value)}
                  value={hsd}
                  placeholder={"Price"}
                />
              </View>
              <View style={tw`w-[45%]`}>
                <Text style={tw`text-lg mb-1 ml-1 text-gray-700`}>
                  005-Premium Diesel
                </Text>
                {phsdError && (
                  <Text style={tw`text-lg mb-1 ml-1 text-red-500`}>
                    This field is required
                  </Text>
                )}
                <AppInput
                  onChangeText={(value) => setPhsd(value)}
                  value={phsd}
                  placeholder={"Price"}
                />
              </View>
              <TouchableOpacity
                onPress={(e) => handleChange(e)}
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
