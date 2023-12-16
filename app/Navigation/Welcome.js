import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import color from "../config/color";
import { Main } from "../screens/Main";
import { Reports } from "../screens/Reports";
import { AppNavigator } from "./AppNavigator";
import { Vouchers } from "../screens/Vouchers";
import { Account } from "../screens/Account";
import Info from "../screens/Account/Info";
import { Login } from "../screens/Login";
const Stack = createNativeStackNavigator();

export const Welcome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 80,
          backgroundColor: color.bottomActiveNavigation,
        },
        headerTintColor: color.light,
      }}
    >
      <Stack.Screen
        name="index"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: color.bottomActiveNavigation,
          },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
