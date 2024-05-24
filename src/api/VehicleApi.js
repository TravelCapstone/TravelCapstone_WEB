import api from "../config/axios";
const getPriceForVehicle = async (pageNumber, pageSize, data) => {
  try {
    const response = await api.post(
      `/vehicle/get-price-for-vehicle/${pageNumber}/${pageSize}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sell price:", error);
    return [];
  }
};
const getOptimalPath = async (startDestinationId, data) => {
  try {
    const response = await api.post(
      `/api/map/get-optimal-path?StartDestinationId=${startDestinationId}&IsPilgrimageTrip=false`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sell price:", error);
    return [];
  }
};
export { getPriceForVehicle, getOptimalPath };
