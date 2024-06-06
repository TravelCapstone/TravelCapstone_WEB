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

const getAvailableVehicleType = async (
  provinceStartPointId,
  provinceEndPointId
) => {
  try {
    const response = await api.get(
      `/vehicle/get-available-vehicle-type/${provinceStartPointId}/${provinceEndPointId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sell price:", error);
    return [];
  }
};
const getAvailableVehicle = async (
  startTime,
  endTime,
  pageNumber,
  pageSize
) => {
  try {
    const response = await api.get(
      `/vehicle/get-available-vehicle?startTime=${startTime}&endTime=${endTime}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sell price:", error);
    return [];
  }
};

export {
  getPriceForVehicle,
  getOptimalPath,
  getAvailableVehicleType,
  getAvailableVehicle,
};
