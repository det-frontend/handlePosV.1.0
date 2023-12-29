import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, Text, View, Modal, TouchableOpacity } from "react-native";
import { Screen } from "../../components/Screen";
import color from "../../config/color";
import cardApi from "../../api/getCard";
import WholeRequestApi from "../../api/wholereq";
import Paho from "paho-mqtt";
import { DataContext } from "../../Navigation/AppNavigator";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import Constants from "expo-constants";
import { IconTextInput } from "../../components/IconTextInput";
import PermitComponent from "../../components/PermitComponent";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import PermitApi from "../../api/permit";
import LiveCount from "../../components/LiveCount";
import VoucherReload from "../../auth/VoucherReload";

export const Main = () => {
  const [final, setFinal] = useState(false);
  const [realTimeEditChooseOne, setRealTimeEditChooseOn] = useState(false);
  const [saleLiter, setSaleLiter] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [img, setImg] = useState(require("../../../assets/warning.png"));
  const [liveData, setLiveData] = useState();
  const [premitFormInfo, setPremitFormInfo] = useState();
  const { refresh } = useContext(DataContext);
  const [fetchObj, setFetchObj] = useState();
  const [printFormInfo, setPrintFormInfo] = useState();
  const [chooseOne, setChooseOne] = useState(false);
  const { loading: load } = useContext(DataContext);
  const [httpCode, setHttpCode] = useState(false);
  const [vocNumber, setVocNumber] = useState("");
  const [visible, setVisible] = useState(false);
  const { liveDespenserHistory } = useContext(DataContext);
  const [noz, setNoz] = useState();
  const [singleData, setSingleData] = useState();
  const [permitState, setPermitState] = useState(false);
  const [isPermit, setIsPermit] = useState();
  const [permit, setPermit] = useState();
  const [readyDespenserHistory, setReadyDespenserHistory] = useState([]);
  const readyDespenserHistoryRef = useRef(readyDespenserHistory);
  const [finalData, setFinalData] = useState(0);
  const [allDone, setAllDone] = useState("");
  const [presetButtonDisable, setPresetButtonDisable] = useState(false);
  const [permitButtonDisable, setPermitButtonDisable] = useState(false);
  const checkLiveRef = useRef({
    nozzle: "",
  });
  const [realTimeEdit, setRealTimeEdit] = useState({
    objId: "",
    cashType: "",
    carNo: "",  
    purpose_of_use: "",
    couObjId: "",
    couName: "",
    couId: "",
  });
  const { setRe } = useContext(VoucherReload);
  // console.log("====================================");
  // console.log(setRe);
  // console.log("====================================");

  const [payloadHistory, setPayloadHistory] = useState([]);
  const payloadHistoryRef = useRef(payloadHistory);
  const [noMorePermit, setNoMorePermit] = useState(null);
  const [permitd, setPermitd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noPermit, setNopermit] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [nozzle1FuelDetail, setNozzle1FuelDetail] = useState({
    liter: 0,
    price: 0,
  });
  const nozzle1FuelDetailRef = useRef({ liter: "", price: "" });
  const [nozzle1PermitRecord, setNozzle1PermitRecord] = useState(0);
  const permitRef = useRef({
    nozzle: "",
  });

  const [liveDispenser, setLiveDispenser] = useState(undefined);
  // const [liveDespenserHistory, setLiveDespenserHistory] = useState([]);
  const liveDespenserHistoryRef = useRef(liveDespenserHistory);
  // const [loading, setLoading] = useState(false);
  // const [refresh, setRefresh] = useState(false);
  // const [permitd, setPermitd] = useState(false);
  const regex = /[A-Z]/g;

  // const [payloadHistory, setPayloadHistory] = useState([]);
  // const payloadHistoryRef = useRef(payloadHistory);

  // const [readyDespenserHistory, setReadyDespenserHistory] = useState([]);
  // const readyDespenserHistoryRef = useRef(readyDespenserHistory);

  useEffect(() => {
    payloadHistoryRef.current = payloadHistory;
  }, [payloadHistory]);

  useEffect(() => {
    readyDespenserHistoryRef.current = readyDespenserHistory;
  }, [readyDespenserHistory]);
  // console.log("====ppp================================");
  // // console.log(payloadHistory);
  // console.log(singleData);
  // console.log("====================================");

  // const liveDespenserHistoryRef = useRef(liveDespenserHistory);

  // const [refresh, setRefresh] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [dispenserCards, setDispenserCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,
    Poppins_400Regular,
  });
  // console.log("==ggg==================================");
  // console.log(liveDespenserHistory?.includes("1"));
  // console.log(dispenserCards);
  // console.log("====================================");

  function onMessage(message) {
    if (
      message.destinationName.startsWith("detpos/device/permit/") &&
      /[1-8]$/.test(message.destinationName)
    ) {
      const prefix = message.payloadString.substring(0, 2); // "01"

      const topicCount = payloadHistoryRef.current.filter(
        (t) => t === parseInt(prefix)
      ).length;
      if (topicCount < 2) {
        setPayloadHistory((prevTopics) => [...prevTopics, parseInt(prefix)]);
      }
      setNoMorePermit("hhh");
    }

    if (message.destinationName === "detpos/local_server") {
      const prefix = message.payloadString.substring(0, 2); // "01"
      setAllDone(prefix);
      // setFetchNew((prev)=>!prev)
    }

    if (message.destinationName === "detpos/device/price") {
      setPriceChange(true);
    }

    if (message.destinationName === "detpos/local_server/mode") {
      if (message.payloadString === "allow") {
        setPermitd(true);
      } else if (message.payloadString === "manual") {
        setPermitd(false);
      }
    }

    if (message.destinationName === "detpos/local_server/price_change") {
      setPriceChange(true);
    }

    if (
      message.destinationName.startsWith("detpos/local_server") &&
      /[1-8]$/.test(message.destinationName)
    ) {
      const prefix = message.payloadString.substring(0, 2); // "01"

      const topicCount = readyDespenserHistoryRef.current.filter(
        (t) => t === parseInt(prefix)
      ).length;
      if (topicCount < 1) {
        setReadyDespenserHistory((prevTopics) => [
          ...prevTopics,
          parseInt(prefix),
        ]);
      }
    }

    // console.log(message.payloadString)

    // console.log(message.payloadString, message.destinationName);

    // if (message.destinationName === "detpos/device/whreq") {
    //   const topicCount = liveDespenserHistoryRef.current.filter(
    //     (t) => t == message.payloadString
    //   ).length;
    //   if (topicCount < 2) {
    //     setLiveDespenserHistory((prevTopics) => [
    //       ...prevTopics,
    //       message.payloadString,
    //     ]);
    //   }
    // }

    if (message.destinationName === "detpos/device/req") {
      const prefix = message.payloadString.substring(0, 2); // "01"
      const suffix = message.payloadString.substring(2); // "cancel"

      setNoMorePermit(prefix);
    }

    if (
      message.destinationName.startsWith("detpos/device/Final/") &&
      /[1-8]$/.test(message.destinationName)
    ) {
      let data = message.payloadString.split(regex);
      setFinalData(data[0]);
    }

    if (
      message.destinationName.startsWith("detpos/device/livedata/") &&
      /[1-8]$/.test(message.destinationName)
    ) {
      let data = message.payloadString.split(regex);
      const updatedNozzle1FuelDetail = {
        liter: data[1],
        price: data[2],
        nozzleNo: data[0],
      };

      const checkLive = {
        nozzleNo: data[0],
      };

      checkLiveRef.current = {
        ...checkLiveRef.current,
        ...checkLive,
      };

      nozzle1FuelDetailRef.current = {
        ...nozzle1FuelDetailRef.current,
        ...updatedNozzle1FuelDetail,
      };
    }
  }

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
  useEffect(() => {
    let ok = finalData;
    setFinalData(ok);
  }, [finalData]);

  useEffect(() => {
    const fetchIt = async () => {
      const result = await cardApi.cards();
      if (!result.data?.con) {
        // setError(true);
        // auth.logOut();
        // const ok = async () => {
        //   const kerj = await authStorage.removeToken();
        // };
        // ok();
      }
      if (result.data?.result) {
        // setError(false);
        setDispenserCards(result.data?.result);
      }
    };

    fetchIt();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // const handleReq = async () => {
  //   setLiveDespenserHistory([]);
  //   setLoading(true);
  //   const response = await WholeRequestApi.requests();
  //   setRefresh((prev) => !prev);
  //   setLoading(false);
  // };

  // const reload = async () => {
  //   setRefresh((prev) => !prev);
  // };
  const permitHandler = (nozz) => {
    return payloadHistory.includes(parseInt(nozz));
  };

  const handlePermit = async () => {
    if (
      premitFormInfo.couObjId == undefined &&
      premitFormInfo.cashType == "Debt"
    ) {
      setChooseOne(true);
      return;
    } else {
      if (!permitButtonDisable) {
        setPermitButtonDisable(true);
      }
      setLoading(true);
      setChooseOne(false);

      const permitObject = await PermitApi.permit(
        singleData?.dep_no,
        singleData?.nozzle_no,
        premitFormInfo.vehicleType,
        premitFormInfo.carNo,
        premitFormInfo.cashType,
        singleData?.fuel_type,
        premitFormInfo.couObjId,
        singleData?.daily_price
      );

      setLoading(false);

      if (permitObject) {
        setPermitButtonDisable(false);
      }

      if (!permitObject.data?.result) {
        setPermitState(true);
        // let smg = permitObject.data.msg;
        // console.log("smg",smg)
        // smg = smg.split(":");
        // smg = smg[2];
        // setVocNumber(smg);
        setPayloadHistory((prevTopics) => {
          // Filter out elements that match the value of parseInt(singleData?.nozzle_no)
          const updatedTopicsArray = prevTopics.filter(
            (topic) => topic !== parseInt(singleData?.nozzle_no)
          );

          return updatedTopicsArray;
        });
        setRe((pre) => !pre);
        setModalVisible(false);
        return;
      }

      if (permitObject.data?.result) {
        setHttpCode(true);
        setFetchObj(permitObject.data.result);
        setPrintFormInfo({
          nozzle_no: singleData?.nozzle_no,
          objId: permitObject.data.result._id,
          vocono: permitObject.data.result.vocono,
          cashType: permitObject.data.result.cashType,
          carNo: permitObject.data.result.carNo,
          purposeOfUse: permitObject.data.result.vehicleType,
          customerName: premitFormInfo.couName,
          customerId: premitFormInfo.cou_id,
          customerObjId: premitFormInfo.couObjId,
        });

        setRealTimeEdit({
          object_Id: permitObject.data.result._id,
          cash_type: permitObject.data.result.cashType,
          car_no: permitObject.data.result.carNo,
          purpose_of_use: permitObject.data.result.vehicleType,
          customer_name: premitFormInfo.couName,
          customer_id: premitFormInfo.cou_id,
        });
        setIsPermit(true);
      }

      if (!permitObject.data?.con) {
        // auth.logOut();
      }

      //  setTimeout(() => {
      //     setPermitButtonDisable(false);
      //   }, 2000); // 2000 milliseconds (2 seconds)
    }
  };

  // permit handle end here

  const handleUpdate = () => {
    if (managerPassword == undefined && managerUserName == undefined) {
      setErrorPermission(true);
    } else {
      setErrorPermission(false);
      const errorUpdate = async () => {
        setLoading(true);

        const response = await ErrorApi.update(
          printFormInfo.objId,
          printFormInfo.nozzle_no,
          singleData?.daily_price,
          managerUserName,
          managerPassword
        );

        if (response.data.con === true) {
          setPrintFormInfo("");
          setErrorUpdate("");
          setPayloadHistory((prev) =>
            prev.filter(
              (number) => parseInt(number) !== parseInt(singleData?.nozzle_no)
            )
          );

          setIsPermit(false);
          setIsErrorCon(false);

          setLiveData("");

          setFinal(false);
          setNopermit(false);
          setNozzleActive(false);
          setFinalData(false);
          setAllDone(false);
          setPermitState(false);
          setRe((pre) => !pre);
          setModalVisible(false);
          setIsClosed(false);
          setPayloadHistory((prev) =>
            prev.filter(
              (number) => parseInt(number) !== parseInt(singleData?.nozzle_no)
            )
          );
        } else {
          setErrorUpdate(response.data.msg);
        }

        setLoading(false);
      };

      errorUpdate();
    }
  };

  const handleReadyState = async () => {
    if (!presetButtonDisable) {
      setPresetButtonDisable(true);
    }

    if (premitFormInfo.type === "liter") {
      setLoading(true);
      const permitObject = await presetApi.liter(
        singleData?.dep_no,
        singleData?.nozzle_no,
        singleData?.fuel_type,
        premitFormInfo.value,
        premitFormInfo.carNo,
        premitFormInfo.vehicleType,
        premitFormInfo.cashType,
        singleData?.daily_price,
        premitFormInfo.couObjId
      );
      setLoading(false);

      if (permitObject.data?.con) {
        setPayloadHistory((prevTopics) => [
          ...prevTopics,
          parseInt(singleData?.nozzle_no),
        ]);
      }

      if (!permitObject.data?.con) {
        setPermitState(true);
        let smg = permitObject.data.msg;
        smg = smg.split(":");
        smg = smg[2];

        setVocNumber(smg);
        return;
      }

      if (permitObject.data?.result) {
        setHttpCode(true);
        setFetchObj(permitObject.data.result);
        setPrintFormInfo({
          nozzle_no: singleData?.nozzle_no,
          objId: permitObject.data.result._id,
          vocono: permitObject.data.result.vocono,
          cashType: permitObject.data.result.cashType,
          carNo: permitObject.data.result.carNo,
          purposeOfUse: permitObject.data.result.vehicleType,
          customerName: premitFormInfo.couName,
          customerId: premitFormInfo.cou_id,
          customerObjId: premitFormInfo.couObjId,
        });
        setRealTimeEdit({
          object_Id: permitObject.data.result._id,
          cash_type: permitObject.data.result.cashType,
          car_no: permitObject.data.result.carNo,
          purpose_of_use: permitObject.data.result.vehicleType,
          customer_name: premitFormInfo.couName,
          customer_id: premitFormInfo.cou_id,
        });
        setIsPermit(true);
      }

      if (!permitObject.data?.con) {
        // auth.logOut();
      }
      setReadyState(false);
    }

    if (premitFormInfo.type === "kyat") {
      setLoading(true);
      const permitObject = await presetApi.price(
        singleData?.dep_no,
        singleData?.nozzle_no,
        singleData?.fuel_type,
        premitFormInfo.value,
        premitFormInfo.carNo,
        premitFormInfo.vehicleType,
        premitFormInfo.cashType,
        singleData?.daily_price,
        premitFormInfo.couObjId
      );

      if (permitObject.data?.con) {
        setPayloadHistory((prevTopics) => [
          ...prevTopics,
          parseInt(singleData?.nozzle_no),
        ]);
        if (!permitObject.data?.con) {
          setPermitState(true);
          let smg = permitObject.data.msg;
          smg = smg.split(":");
          smg = smg[2];

          setVocNumber(smg);
          return;
        }

        setLoading(false);

        if (permitObject.data?.result) {
          setHttpCode(true);
          setFetchObj(permitObject.data.result);
          setPrintFormInfo({
            nozzle_no: singleData?.nozzle_no,
            objId: permitObject.data.result._id,
            vocono: permitObject.data.result.vocono,
            cashType: permitObject.data.result.cashType,
            carNo: permitObject.data.result.carNo,
            purposeOfUse: permitObject.data.result.vehicleType,
            customerName: premitFormInfo.couName,
            customerId: premitFormInfo.cou_id,
            customerObjId: premitFormInfo.couObjId,
          });
          setRealTimeEdit({
            object_Id: permitObject.data.result._id,
            cash_type: permitObject.data.result.cashType,
            car_no: permitObject.data.result.carNo,
            purpose_of_use: permitObject.data.result.vehicleType,
            customer_name: premitFormInfo.couName,
            customer_id: premitFormInfo.cou_id,
          });
          setIsPermit(true);
        }

        if (!permitObject.data?.con) {
          // auth.logOut();
        }

        setReadyState(false);
      }
    }

    if (premitFormInfo.type === "liter") {
      setLoading(true);
      const permitObject = await presetApi.liter(
        obj.dep_no,
        obj.nozzle_no,
        obj.fuel_type,
        premitFormInfo.value,
        premitFormInfo.carNo,
        premitFormInfo.vehicleType,
        premitFormInfo.cashType,
        obj.daily_price,
        premitFormInfo.couObjId
      );
      setLoading(false);

      if (permitObject.data?.con) {
        setPayloadHistory((prevTopics) => [
          ...prevTopics,
          parseInt(obj.nozzle_no),
        ]);
      }

      if (!permitObject.data?.con) {
        setPermitState(true);
        let smg = permitObject.data.msg;
        smg = smg.split(":");
        smg = smg[2];

        setVocNumber(smg);
        return;
      }

      if (permitObject.data?.result) {
        setHttpCode(true);
        setFetchObj(permitObject.data.result);
        setPrintFormInfo({
          nozzle_no: obj.nozzle_no,
          objId: permitObject.data.result._id,
          vocono: permitObject.data.result.vocono,
          cashType: permitObject.data.result.cashType,
          carNo: permitObject.data.result.carNo,
          purposeOfUse: permitObject.data.result.vehicleType,
          customerName: premitFormInfo.couName,
          customerId: premitFormInfo.cou_id,
          customerObjId: premitFormInfo.couObjId,
        });
        setRealTimeEdit({
          object_Id: permitObject.data.result._id,
          cash_type: permitObject.data.result.cashType,
          car_no: permitObject.data.result.carNo,
          purpose_of_use: permitObject.data.result.vehicleType,
          customer_name: premitFormInfo.couName,
          customer_id: premitFormInfo.cou_id,
        });
        setIsPermit(true);
      }

      if (!permitObject.data?.con) {
        // auth.logOut();
      }
      setReadyState(false);
    }

    setTimeout(() => {
      setPresetButtonDisable(false);
    }, 3000);
  };

  const handleReadyClick = () => {
    setReadyState(true);
    setModalVisible(true);
  };
  const handlePrint = () => {
    setLoading(true);

    const update = async () => {
      const response = await ToCloudApi.updateInfos(
        printFormInfo.objId,
        printFormInfo.cashType,
        printFormInfo.carNo,
        printFormInfo.purposeOfUse,
        premitFormInfo.customerObjId
      );
    };
    setLoading(false);
    setRe((pre) => !pre);
    setModalVisible(false);
    setIsClosed(false);
    setIsPermit(false);

    update();
  };
  const handleErrorCon = () => {
    setIsErrorCon(true);
  };

  const handleRealTimeUpdate = () => {
    if (realTimeEdit.customer_id == "" && printFormInfo.cashType == "Debt") {
      setRealTimeEditChooseOn(true);
      return;
    } else {
      setRealTimeEditChooseOn(false);

      const fetchIt = async () => {
        setLoading(true);
        const response = await UpdateInfosApi.updateInfos(
          printFormInfo.objId,
          printFormInfo.cashType,
          printFormInfo.carNo,
          printFormInfo.purposeOfUse,
          printFormInfo.customerObjId
        );

        setLoading(false);
      };

      fetchIt();
    }
  };

  // console.log("===from index=================================");
  // console.log("isPermit is ", isPermit);
  // console.log("====================================");

  return (
    <Screen>
      {load ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <Loader />
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
            rowGap: 3,
          }}
        >
          {dispenserCards.map((e, index) => (
            <Card
              setModalVisible={setModalVisible}
              allDone={allDone}
              setAllDone={setAllDone}
              setPermit={setPermit}
              setIsPermit={setIsPermit}
              setSingleData={setSingleData}
              approve={readyDespenserHistory.includes(parseInt(e.nozzle_no))}
              setApprove={setReadyDespenserHistory}
              checkLiveRef={checkLiveRef}
              liveData={liveData == e.nozzle_no ? liveData : undefined}
              setLiveData={setLiveData}
              finalData={finalData}
              setFinalData={setFinalData}
              img={img}
              setPayloadHistory={setPayloadHistory}
              noMorePermit={noMorePermit}
              obj={e}
              permitHandler={permitHandler}
              liveDespenserHistory={liveDespenserHistory}
            />
          ))}
          {/* {permitHandler(e.nozzle_no) ? ( */}
          {modalVisible &&
            (isPermit ? (
              <LiveCount
                obj={singleData}
                fetchObj={fetchObj}
                setSaleLiter={setSaleLiter}
                setModalVisiblesetRe
                setSalePrice={setSalePrice}
                printFormInfo={printFormInfo}
                setPrintFormInfo={setPrintFormInfo}
                handlePrint={handlePrint}
                handleErrorCon={handleErrorCon}
                nozzle1FuelDetail={nozzle1FuelDetailRef}
                final={final}
                setRealTimeEdit={setRealTimeEdit}
                handleRealTimeUpdate={handleRealTimeUpdate}
                realTimeEditChooseOne={realTimeEditChooseOne}
                permit={permit}
                isPermit={isPermit}
                singleData={singleData}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                noz={noz}
                setPermitState={setPermitState}
                vocNumber={vocNumber}
                permitState={permitState}
                setPremitFormInfo={setPremitFormInfo}
                chooseOne={chooseOne}
                permitButtonDisable={permitButtonDisable}
              />
            ) : (
              <PermitComponent
                obj={singleData}
                fetchObj={fetchObj}
                setSaleLiter={setSaleLiter}
                setSalePrice={setSalePrice}
                printFormInfo={printFormInfo}
                setPrintFormInfo={setPrintFormInfo}
                handlePrint={handlePrint}
                handleErrorCon={handleErrorCon}
                nozzle1FuelDetail={nozzle1FuelDetail}
                final={final}
                setRealTimeEdit={setRealTimeEdit}
                handleRealTimeUpdate={handleRealTimeUpdate}
                realTimeEditChooseOne={realTimeEditChooseOne}
                permit={permit}
                handlePermit={handlePermit}
                isPermit={isPermit}
                singleData={singleData}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                noz={noz}
                setPermitState={setPermitState}
                vocNumber={vocNumber}
                permitState={permitState}
                setPremitFormInfo={setPremitFormInfo}
                chooseOne={chooseOne}
                permitButtonDisable={permitButtonDisable}
              />
            ))}

          {/* ) : (
            <PermitComponent
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
              noz={noz}
            />
          )} */}
        </View>
      )}
    </Screen>
  );
};
