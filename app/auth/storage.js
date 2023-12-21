import * as SecureStore from "expo-secure-store";
// import jwtDecode from "jwt-decode";
// import useAuth from "./useAuth";
// import { decode } from "base-64";
///fjf

const key = "authToken";
// const otpKey = "otpToken";

const setToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing tha auth token ", error);
  }
};

// const setOTP = async (OTP) => {
//   try {
//     await SecureStore.setItemAsync(otpKey, OTP);
//   } catch (error) {
//     console.log("Error storing the otp", error);
//   }
// };

// const getOTP = async () => {
//   try {
//     return await SecureStore.getItemAsync(otpKey);
//   } catch (error) {
//     console.log("Error getting the OTP token", error);
//   }
// };

// const getUser = async () => {
//   global.atob = decode;
//   const token = await getToken();
//   return token ? jwtDecode(token) : null;
// };

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

// const tokenExpires = async () => {
//   const { user, setUser } = useAuth();

//   try {
//     await removeToken();
//     setUser(null);
//   } catch (error) {
//     console.log("Removing Token from expires", error);
//   }
// };

// const removeOTP = async () => {
//   try {
//     await SecureStore.deleteItemAsync(otpKey);
//   } catch (error) {
//     console.log("Error  removing the auth token", error);
//   }
// };

export default {
  getToken,
  removeToken,
  setToken,
//   getUser,
//   tokenExpires,
//   setOTP,
//   getOTP,
//   removeOTP,
};
