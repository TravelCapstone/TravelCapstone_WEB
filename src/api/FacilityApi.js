import api from "../config/axios";

const getAllFacilityByProvince = async (provinceId) => {
    try {
      const response = await api.get(`/facility/get-all-facility-by-province-Id/${provinceId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching provinces:', error);
      return []; 
    }
  };
const getServiceByFacilityId = async (facilityId,pageNumber,pageSize)=>{
  try {
    const response = await api.get(`/facility-service/get-service-by-facilityId/${facilityId}?pageNumber=${pageNumber}&pageSize=${pageSize}
    `);
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return []; 
  }
}

const getAllFacility = async (pageNumber,pageSize)=>{
  try {
    const response = await api.get(`/facility/get-all-facility?pageNumber=${pageNumber}&pageSize=${pageSize}
    `);
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return []; 
  }
}
  export {
    getAllFacilityByProvince,
    getServiceByFacilityId,
    getAllFacility

  }