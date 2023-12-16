import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import color from "../config/color";
import { Main } from "../screens/Main";
import { Reports } from "../screens/Reports";
import { AppNavigator } from "./AppNavigator";
import { Vouchers } from "../screens/Vouchers";
import { Account } from "../screens/Account";
import Info from "../screens/Account/Info";
const Stack = createNativeStackNavigator();

export const AccountNavigator = () => {
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
        component={Account}
        options={{
          headerStyle: {
            backgroundColor: color.bottomActiveNavigation,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="info"
        component={Info}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: color.bottomActiveNavigation,
          },
        }}
      />
    </Stack.Navigator>
  );
};
