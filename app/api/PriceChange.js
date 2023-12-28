import client from "./client";

const priceChange = (obj) => client.post("/daily-price", obj);

export default {
  priceChange,
};
