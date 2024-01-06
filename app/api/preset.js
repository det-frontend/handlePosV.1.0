import client from "./client";

const liter = (
  depNo,
  nozzleNo,
  fuelType,
  liter,
  carNo,
  vehicleType,
  cashType,
  salePrice
) =>
  client.post(`detail-sale/preset?depNo=${depNo}&nozzleNo=${nozzleNo}`, {
    nozzleNo,
    fuelType,
    liter: liter,
    carNo,
    vehicleType,
    cashType,
    salePrice,
    device: "tablet",
  });

const price = (
  depNo,
  nozzleNo,
  fuelType,
  kyat,
  carNo,
  vehicleType,
  cashType,
  salePrice
) =>
  client.post(`detail-sale/preset?depNo=${depNo}&nozzleNo=${nozzleNo}`, {
    nozzleNo,
    fuelType,
    kyat: kyat,
    carNo,
    vehicleType,
    cashType,
    salePrice,
    device: "tablet",
  });

export default {
  liter,
  price,
};
