import api from "../config/axios";

const getAllReferenceTransportPrice = async(pageNumber,pageSize) =>{
    try {
      const response = await api.get(
        `reference-transport-price/get-all-reference-transport/${pageNumber}/${pageSize}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  const getAllReferenceTransportPriceByFilter = async(filter,pageNumber,pageSize) =>{
    try {
      const response = await api.post(
        `reference-transport-price/get-all-reference-transport-by-filter/${pageNumber}/${pageSize}`,filter
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  export { getAllReferenceTransportPrice,getAllReferenceTransportPriceByFilter}
  