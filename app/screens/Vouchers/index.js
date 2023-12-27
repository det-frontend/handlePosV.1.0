import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Screen } from "../../components/Screen";
import VouncherCard from "../../components/VouncherCard";
import tw from "twrnc";
import SwipPrint from "../../components/SwipPrint";
import DailySaleApi from "../../api/getDailySale";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import { useFocusEffect } from "@react-navigation/native";
import { manipulateAsync } from "expo-image-manipulator";
import { Asset } from "expo-asset";

export const Vouchers = ({ navigation }) => {
  const [asyncImage, setAsyncImage] = useState(null);
  const [read, setRead] = React.useState();
  const [dailySale, setDailySale] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [openCardId, setOpenCardId] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getImage();
      getData(); // Call the function to fetch user data
    }, [])
  );

  const getImage = async () => {
    try {
      const value = await AsyncStorage.getItem("image");
      if (value !== null) {
        // value previously stored
        console.log("=ddd===================================");
        console.log(value);
        console.log("====================================");
        setAsyncImage(value);
      }
    } catch (e) {
      // error reading value
      console.log("====================================");
      console.log("get err");
      console.log("====================================");
    }
  };
  // useEffect(() => {
  //   getImage();
  // }, []);

  useEffect(() => {
    const fetchit = async () => {
      setLoading(true);
      const { data } = await DailySaleApi.dailySales();
      // console.log("==dddd==================================");
      // console.log(data);
      // console.log("====================================");
      setLoading(false);

      if (data.result) {
        setDailySale(data.result);
      }
    };
    fetchit();
    console.log("useeffect");
  }, []);

  const print = async (item, read) => {
    const utcTimestamp = item?.createAt;
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
    // const asset = Asset.fromModule(require("../../../assets/logo.png"));
    const asset = Asset.fromModule(asyncImage);
    const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
      base64: true,
    });
    const html = `<html>
  <head>
      <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet">
      <style>
          * {
              font-size: 9.5px;
              font-family: 'Roboto', sans-serif;
          }
      </style>
  </head>

  <body>
      <div style="text-align: center;">
           <img
        src="data:image/jpeg;base64,${image.base64}"
        style="width: 25vw;margin-bottom:5px ; "/>
          <table>
              <tr>
                  <td style="font-weight: bold; ">F.S Code</td>
                 <td>: ${read ? read?.station : "....."}</td>
              </tr>
              <tr>
                  <td style="font-weight: bold; ">Voucher</td>
                  <td>: ${item?.vocono}</td>
              </tr>
              <tr>
                  <td style="font-weight: bold; ">Date</td>
               <td>: ${year}-${month}-${day} ${hour}:${min}:${sec} ${amPm}</td>
              </tr>
              <tr>
                  <td style="font-weight: bold; ">Car No.</td>
                  <td>: ${item?.carNo}</td>
              </tr>
              <tr>
                  <td style="font-weight: bold; ">Nozzle</td>
                  <td>: ${item?.nozzleNo}</td>
              </tr>
              <tr>
                  <td style="font-weight: bold; ">F.S Ph</td>
                  <td>: ${read ? read?.ph_1 : "....."} / ${
      read ? read?.ph_2 : "....."
    }</td>
              </tr>
          </table>
      </div>
      <hr>
      <div style="margin-top: -5px;">
          <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 0.5px dashed black;">
                  <td style="padding: 10px 0px; font-weight: bold;">Fuel Type</td>
                  <td colspan="2" style="font-weight: bold;">Price x Liter</td>
                  <td style="text-align: end; font-weight: bold;">Amount</td>
              </tr>
              <tr>
                  <td style="padding: 10px 0px;">${item?.fuelType}</td>
                  <td>${item?.salePrice?.toFixed(
                    2
                  )} x ${item?.totalizer_liter?.toFixed(2)}</td>
                  <td>MMK</td>
                  <td style="text-align: end;">${item?.totalPrice?.toFixed(
                    2
                  )}</td>
              </tr>
              <tr style="border-top: 0.5px solid black;">
                  <td style="padding: 10px 0px; text-align: center; font-weight: bold;" colspan="2">Total (Inclusive Tax)</td>
                  <td>MMK</td>
                  <td style="text-align: end; font-weight: bold;">${item?.totalPrice?.toFixed(
                    2
                  )}</td>
              </tr>
          </table>
      </div>
      <div style="text-align: center; margin-top: -8px;">
          <h4>Thank you. Please come again.</h4>
          <h4 style="margin-top: -8px;">Have a safe journey.</h4>
      </div>
      <!-- <img src="./assets/detlogo.png" style="width: 90vw;" /> -->
  </body>

  </html>`;
    await Print.printAsync({ html });
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("info");
      setRead(JSON.parse(jsonValue) || "");
      console.log("===bbbbb=================================");
      console.log("...");
      console.log(JSON.parse(jsonValue));
      // console.log(read);
      console.log("===bbbbb=================================");
    } catch (e) {
      console.log("get err");
    }
  };

  // const utcTimestamp = data?.createAt;
  // let hour = utcTimestamp?.slice(11, 13);
  // const min = utcTimestamp?.slice(14, 16);
  // const sec = utcTimestamp?.slice(17, 19);
  // const year = utcTimestamp?.slice(0, 4);
  // const day = utcTimestamp?.slice(5, 7);
  // const month = utcTimestamp?.slice(8, 10);

  // let amPm = "AM";
  // if (hour >= 12) {
  //   amPm = "PM";
  //   hour -= 12;
  // }
  // if (hour === 0) {
  //   hour = 12;
  // }

  // console.log("====data================================");
  // console.log(data);
  // console.log("====data================================");
  // const tag = (item, read) => {

  //   return html;
  // };

  // let row = [];
  // let prevOpenedRow;
  // function closeRow(index) {
  //   if (prevOpenedRow && prevOpenedRow !== row[index]) {
  //     prevOpenedRow.close();
  //   }
  //   prevOpenedRow = row[index];
  // }

  return (
    <Screen>
      {loading ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <Loader />
        </View>
      ) : (
        <ScrollView>
          <View>
            <FlatList
              data={dailySale}
              renderItem={({ item, index }) => (
                <VouncherCard
                  vocono={item.vocono}
                  createAt={item.createAt}
                  totalizer_liter={item.totalizer_liter}
                  totalPrice={item.totalPrice}
                  {...item}
                  isOpen={openCardId === item._id}
                  // onSwipeableOpen={() => {
                  //   closeRow(index), setData(item);
                  // }}
                  renderRightActions={() => (
                    <SwipPrint onPress={() => print(item, read)} />
                  )}
                  keyExtractor={(item) => item?._id}
                />
              )}
            />
          </View>
        </ScrollView>
      )}
    </Screen>
  );
};
