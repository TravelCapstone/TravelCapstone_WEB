import api from "../config/axios";

const getAllReferenceTransportPrice = async(pageNumber,pageSize) =>{
    try {
      const response = await api.get(
        `reference-transport-price/get-all-reference-transport/${pageNumber}/${pageSize}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const getAllReferenceTransportPriceByProvince = async(firstProvince,secondProvince,pageNumber,pageSize) =>{
    try {
      const response = await api.get(
        `reference-transport-price/get-all-reference-transport-by-province-id/${pageNumber}/${pageSize}?firstProvince=${firstProvince}&secondProvince=${secondProvince}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export { getAllReferenceTransportPrice,getAllReferenceTransportPriceByProvince}
  