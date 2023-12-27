import client from "./client";

const cards = () => client.get("/device");

export default {
  cards,
};
