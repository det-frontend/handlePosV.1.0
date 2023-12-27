import client from './client';


const permit = (depNo, nozzleNo, vehicleType, carNo, cashType, fuelType,couObjId) =>  client.post(`/detail-sale?depNo=${depNo}&nozzleNo=${nozzleNo}`, {
    nozzleNo,
    vehicleType,
    carNo,
    cashType,
    fuelType,
    couObjId,
    device:'tablet'
  });




export default {
    permit
}