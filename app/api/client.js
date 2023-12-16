import { create } from "apisauce";
import authStorage from "../auth/storage";

//  http://localhost:9000
// http://192.168.0.100:9000/api
const client = create({
  baseURL: "http://192.168.0.100:9000/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

client.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = "Bearer " + authToken;
});

export default client;
