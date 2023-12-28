import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import color from "../config/color";
import VoucherReload from "../auth/VoucherReload";

const Card = ({
  obj,
  setSingleData,
  finalData,
  setFinalData,
  img,
  allDone,
  setAllDone,
  liveData,
  setModalVisible,
  setPayloadHistory,
  noMorePermit,
  liveDespenserHistory,
  permitHandler,
  checkLiveRef,
  setLiveData,
  approve,
  setApprove,
  setIsPermit,
  setPermit,
  //   setFetchNew,
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const [isAlready, setIsAlready] = useState(false);
  const [myInfo, setMyInfo] = useState({
    objectId: null,
    saleLiter: 0,
    salePrice: 0,
    couObjId: null,
    vehicleType: null,
    cashType: null,
    vocono: null,
  });

  //   const [isPermit, setIsPermit] = useState(false);
  const [isErrorCon, setIsErrorCon] = useState(false);
  const [premitFormInfo, setPremitFormInfo] = useState();
  const [printFormInfo, setPrintFormInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [noPermit, setNopermit] = useState(false);
  const [saleLiter, setSaleLiter] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [final, setFinal] = useState(false);
  const [httpCode, setHttpCode] = useState(false);
  const [permitState, setPermitState] = useState(false);
  const [nozzleActive, setNozzleActive] = useState(false);
  const [realTimeEdit, setRealTimeEdit] = useState({
    objId: "",
    cashType: "",
    carNo: "",
    purpose_of_use: "",
    couObjId: "",
    couName: "",
    couId: "",
  });
  const [chooseOne, setChooseOne] = useState(false);
  const [realTimeEditChooseOne, setRealTimeEditChooseOn] = useState(false);
  const [fetchObj, setFetchObj] = useState();
  const [managerUserName, setManagerUserName] = useState(undefined);
  const [managerPassword, setManagerPassword] = useState(undefined);
  const [errorPermission, setErrorPermission] = useState("");
  const [errorUpdate, setErrorUpdate] = useState("");
  const [readyState, setReadyState] = useState("");
  const [readyStateObj, setReadyStateObj] = useState("");
  const [vocNumber, setVocNumber] = useState("");
  const [presetButtonDisable, setPresetButtonDisable] = useState(false);
  const [permitButtonDisable, setPermitButtonDisable] = useState(false);
  const active = permitHandler(obj.nozzle_no);
  const { setRe } = useContext(VoucherReload);
  //   const [noPermit, setNopermit] = useState(false);
  //   const [visible, setVisible] = useState(false);
  //   const [nozzleActive, setNozzleActive] = useState(false);
  //   const [final, setFinal] = useState(false);
  //   const [permitState, setPermitState] = useState(false);

  useEffect(() => {
    if (parseInt(noMorePermit) === parseInt(obj.nozzle_no)) {
      setNopermit(true);
      setModalVisible(false);
      setNozzleActive(false);

      setPayloadHistory((prev) =>
        prev.filter((number) => number !== parseInt(obj.nozzle_no))
      );
      setPayloadHistory((prev) => [...prev, obj.nozzle_no]);
    }

    if (parseInt(noMorePermit) !== parseInt(obj.nozzle_no)) {
      setNopermit(false);
    }
  }, [noMorePermit]);

  useEffect(() => {
    if (parseInt(finalData) === parseInt(obj.nozzle_no)) {
      setRe((pre) => !pre);
      setFinal(true);
      setPermitState(true);
      setNozzleActive(false);
    }
  }, [finalData]);

  useEffect(() => {
    if (parseInt(allDone) === parseInt(obj.nozzle_no)) {
      setLiveData("");
      setNozzleActive(false);
      setModalVisible(false);
      setIsClosed(false);
      setIsPermit(false);
      // setRe((pre) => !pre);
      setFinal(false);
      setNopermit(false);
      setFinalData(false);
      setAllDone(false);
      setPermitState(false);
      //   setFetchNew((prev) => !prev);

      // Resetting values
      obj.current = {};

      checkLiveRef.current.nozzleNo == 0;

      setPayloadHistory((prev) =>
        prev.filter((number) => number !== parseInt(obj.nozzle_no))
      );

      setApprove((prev) =>
        prev.filter((number) => number !== parseInt(obj.nozzle_no))
      );
    }
  }, [allDone]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { nozzleNo } = checkLiveRef.current;

      if (parseInt(nozzleNo) === parseInt(obj.nozzle_no)) {
        setNozzleActive(true);
        setNopermit(false);

        if (active) {
          if (parseInt(nozzleNo) === parseInt(obj.nozzle_no)) {
            setNozzleActive(true);
            setNopermit(false);
          }
        }
        checkLiveRef.current.nozzleNo = 0;
      }
    }, 200); // Update the values every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View
      style={tw`h-24 w-1/5 ${
        permitHandler(obj.nozzle_no)
          ? noPermit
            ? "bg-[#353b48]" //default
            : final //d1s1
            ? "bg-[#7A4DF1]"
            : nozzleActive //livedata
            ? "bg-green-300"
            : approve //appro
            ? "bg-yellow-300"
            : "bg-[#E84118]" //permit
          : "bg-[#353b48]"
      } rounded-lg flex gap-3 items-center justify-center`}
    >
      {liveDespenserHistory?.includes(obj.dep_no) ? (
        <TouchableOpacity
          onPress={() => {
            setModalVisible((prev) => !prev),
              //   setNoz(obj.nozzle_no),
              setSingleData(obj);
            setPermit(permitHandler(obj.nozzle_no));
          }}
          style={tw``}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require("../../assets/pump.png")}
          />
        </TouchableOpacity>
      ) : (
        // <TouchableOpacity
        //   onPress={() => setModalVisible((prev) => !prev)}
        //   style={tw``}
        // >
        <Image style={{ width: 150, height: 150 }} source={img} />
        /* </TouchableOpacity> */
      )}

      <Text
        style={{
          position: "absolute",
          top: 5,
          fontWeight: "100",
          color: color.white,
          fontFamily: "Poppins_400Regular",
        }}
      >
        {obj.nozzle_no}
      </Text>
    </View>
  );
};

export default Card;
