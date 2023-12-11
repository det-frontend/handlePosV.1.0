import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import color from '../config/color';
import { Main } from '../screens/Main';
import { Reports } from '../screens/Reports';
import { Account } from '../screens/Account';
import { AppNavigator } from './AppNavigator';
import { Vouchers } from '../screens/Vouchers';

const Stack = createNativeStackNavigator();


export const Authnavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerStyle: { 
            height:80,
            backgroundColor: color.bottomActiveNavigation
        },
        headerTintColor:color.light,
    }}
    >
    <Stack.Screen
            name="Main"
            component={AppNavigator}
            options={{
                headerStyle: {
                    backgroundColor: color.bottomActiveNavigation,
                },
                headerShown:false
            }}
        />
        <Stack.Screen
            name="Reports"
            component={Reports}
            options={{
                headerStyle: {
                    backgroundColor:color.bottomActiveNavigation
                }
            }}
        />
        <Stack.Screen
            name="Vouchers"
            component={Vouchers}
            options={{
                headerStyle: {
                    backgroundColor:color.bottomActiveNavigation
                }
            }}
        />
        <Stack.Screen
            name="Account"
            component={Account}
            options={{
                headerStyle: {
                    backgroundColor:color.bottomActiveNavigation
                }
            }}
        />
    </Stack.Navigator>
  )
}
