import client from "./client";

const dailySales = async () => client.get("/detail-sale/pagi/1");

const todayTotal = async (sDate, eDate) =>
  client.get(`/detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`);

const todayDetailSale = async (pagi, sDate, eDate) =>
  client.get(`/detail-sale/pagi/by-date/${pagi}?sDate=${sDate}&eDate=${eDate}`);

const noneCloue = async () => client.get(`detail-sale/pagi/1?asyncAlready=a`);

const upload = async (id, obj) =>
  client.post(`detail-sale/ap-update?_id=${id}`, obj);

export default {
  dailySales,
  todayTotal,
  todayDetailSale,
  noneCloue,
  upload,
};
