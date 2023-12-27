import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Main } from "../screens/Main";
import { Account } from "../screens/Account";
import color from "../config/color";
import Paho from "paho-mqtt";
import WholeRequestApi from "../api/wholereq";
import {
  useFonts,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { Reports } from "../screens/Reports";
import { Vouchers } from "../screens/Vouchers";
import { AccountNavigator } from "./AccountNavigator";
import tw from "twrnc";
// import { VoucherNavigator } from "./VoucherNavigator";

const Tab = createBottomTabNavigator();
export const DataContext = createContext();

export const AppNavigator = () => {
  const [liveDespenserHistory, setLiveDespenserHistory] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const liveDespenserHistoryRef = useRef(liveDespenserHistory);
  let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,
    Poppins_400Regular,
  });


  useEffect(() => {
    client = new Paho.Client(
      "192.168.0.100",
      Number(9001), // this has to be a port using websockets
      `android-${parseInt(Math.random() * 100)}`
    );

    mqtt_option = {
      onSuccess: () => {
        client.subscribe("detpos/device/#");
        client.subscribe("detpos/local_server/#");
        console.log("Mqtt is Connected");
      },
      onFailure: (err) => {
        console.log(err);
      },
      userName: "detpos",
      password: "asdffdsa",
      useSSL: false,
    };

    client.connect(mqtt_option);
    client.onMessageArrived = onMessage;
  }, [refresh]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  function onMessage(message) {
    // console.log(message.payloadString)

    // console.log(message.payloadString, message.destinationName);

    if (message.destinationName === "detpos/device/whreq") {
      const topicCount = liveDespenserHistoryRef.current.filter(
        (t) => t == message.payloadString
      ).length;
      if (topicCount < 2) {
        setLiveDespenserHistory((prevTopics) => [
          ...prevTopics,
          message.payloadString,
        ]);
      }
    }
  }

  const handleReq = async () => {
    setLiveDespenserHistory([]);
    setLoading(true);
    const response = await WholeRequestApi.requests();
    setRefresh((prev) => !prev);
    setLoading(false);
  };

  const reload = async () => {
    setRefresh((prev) => !prev);
  };

  return (
    <DataContext.Provider value={{ refresh, loading, liveDespenserHistory }}>
      <Tab.Navigator
        style={tw`z-50`}
        screenOptions={{
          tabBarStyle: { backgroundColor: "#2d3038", height: 85 },
          tabBarActiveTintColor: color.activeColor,
          tabBarLabelStyle: {
            fontSize: 14,
            marginBottom: 10,
            fontFamily: "Poppins_400Regular",
          },
        }}
      >
        <Tab.Screen
          name="DET FMS (POS)"
          component={Main}
          options={{
            tabBarLabel: "Main",
            headerStyle: { backgroundColor: color.bottomActiveNavigation },
            headerTitleStyle: {
              fontFamily: "Poppins_400Regular",
              color: color.white,
              fontSize: 20,
            },
            headerRight: () => (
              <View
                style={tw`mb-7 gap-6 mt-5 mr-2 flex flex-row
                  justify-center items-center`}
              >
                <TouchableOpacity onPress={handleReq}>
                  <View
                    style={tw`bg-[#52a950] w-[130px] flex flex-row rounded-md items-center justify-center h-[50px]`}
                  >
                    <Text
                      style={tw`items-center flex  justify-center text-lg my-auto items-center  `}
                    >
                      Connect
                    </Text>
                    <MaterialCommunityIcons
                      name="connection"
                      size={24}
                      color="black"
                      style={tw`ml-2`}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={reload}>
                  <View
                    style={tw`bg-[#52a950] gap-2 w-[130px] flex flex-row rounded-md items-center justify-center h-[50px]`}
                  >
                    <Text
                      style={tw`items-center flex  justify-center text-lg my-auto items-center  `}
                    >
                      Reload
                    </Text>
                    <MaterialCommunityIcons
                      name="reload"
                      size={24}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ),
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="gas-station"
                size={35}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Reports"
          component={Reports}
          options={{
            headerStyle: { backgroundColor: color.bottomActiveNavigation },
            headerTitleStyle: {
              fontFamily: "Poppins_400Regular",
              color: color.white,
              fontSize: 20,
            },
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="piechart" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Vouchers"
          component={Vouchers}
          options={{
            headerStyle: { backgroundColor: color.bottomActiveNavigation },
            headerTitleStyle: {
              fontFamily: "Poppins_400Regular",
              color: color.white,
              fontSize: 20,
            },
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="file-document"
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountNavigator}
          options={{
            headerStyle: { backgroundColor: color.bottomActiveNavigation },
            headerTitleStyle: {
              fontFamily: "Poppins_400Regular",
              color: color.white,
              fontSize: 20,
            },
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="account-circle"
                size={30}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </DataContext.Provider>
  );
};
