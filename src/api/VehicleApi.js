import api from "../config/axios";
const getPriceForVehicle = async (pageNumber,pageSize,data) => {
    try {
      const response = await api.post(
        `/vehicle/get-price-for-vehicle/${pageNumber}/${pageSize}`,data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching sell price:", error);
      return [];
    }
  };
  export {getPriceForVehicle}