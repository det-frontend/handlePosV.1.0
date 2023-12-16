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

export const Vouchers = ({ navigation }) => {
  const [read, setRead] = React.useState();
  const [dailySale, setDailySale] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [openCardId, setOpenCardId] = useState(null);

  useEffect(() => {
    const fetchit = async () => {
      setLoading(true);
      const { data } = await DailySaleApi.dailySales();
      setLoading(false);

      if (data.result) {
        setDailySale(data.result);
        getData();
      }
    };

    fetchit();
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
          <img src='data:image/png;base64,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' style='height: 60px; margin-bottom: 6px; margin-left: 4px' alt='err'>
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
      setRead(JSON.parse(jsonValue));
      console.log("...");
      console.log(JSON.parse(jsonValue));
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
