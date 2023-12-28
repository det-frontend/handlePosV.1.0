import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Login } from "./app/screens/Login";
import { Stack } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Dispensers } from "./app/screens/Dispensers";
import { Reports } from "./app/screens/Reports";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "./app/config/color";
import { Authnavigator } from "./app/Navigation/Authnavigator";
import { useContext, useEffect, useState } from "react";
import { Welcome } from "./app/Navigation/Welcome";
import AuthContext from "./app/auth/context";
import VoucherReload from "./app/auth/VoucherReload";
import authStorage from "./app/auth/storage";
import { jwtDecode } from "jwt-decode";

function HomeTabs() {
  const Tap = createBottomTabNavigator();

  return (
    <Tap.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: color.button },
        headerTintColor: color.white,
        tabBarStyle: { backgroundColor: "#2a2d35" },
        tabBarActiveTintColor: "#52a950",
        tabBarActiveBackgroundColor: color.button,
        tabBarInactiveTintColor: color.sublight,
      }}
    >
      <Tap.Screen
        name="Dispensers"
        component={Dispensers}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="gas-station"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tap.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="record-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tap.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [re, setRe] = useState(false);
  // const [isReady, setIsReady] = useState(false);
  // const { user, setUser } = useContext(AuthContext);

  // console.log("===uu=================================");
  // console.log(user);
  // console.log("===uu=================================");

  const retoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    setUser(jwtDecode(token));
  };

  // console.log("===ss=================================");
  // console.log(user);
  // console.log("====================================");

  useEffect(() => {
    retoreToken();
  }, []);

  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={retoreToken}
  //       onFinish={() => setIsReady(true)}
  //       onError={(err) => console.log("fun", err)}
  //     />
  //   );

  return (
    <VoucherReload.Provider value={{ re, setRe }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {/* <Welcome /> */}
          {user ? <Authnavigator /> : <Welcome />}
        </NavigationContainer>
      </AuthContext.Provider>
    </VoucherReload.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boxLogo: {
    width: 100,
    height: 100,
  },
});
