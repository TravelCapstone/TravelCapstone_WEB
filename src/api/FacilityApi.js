import api from "../config/axios";

const getAllFacilityByFilter = async (data,pageNumber,pageSize) => {
    try {
      const response = await api.post(`/facility/get-all-facility-by-filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,data);
      return response.data;
    } catch (error) {
      console.error('Error fetching provinces:', error);
      return []; 
    }
  };


const getAllFacilityByLocationAndRatingId = async (ratingId, data, pageNumber, pageSize) => {
    try {
        const response = await api.post(
            `/facility/get-all-facility-by-location-and-ratingId/${ratingId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching facilities:', error);
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

const getAllFacilityRating  = async (id)=>{
  try {
    const response = await api.get(`/facility-type/get-all-facility-rating-by-facilityId/${id}
    `);
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return []; 
  }
}

  export {
    getAllFacilityRating,
    getAllFacilityByFilter,
    getServiceByFacilityId,
    getAllFacility,
    getAllFacilityByLocationAndRatingId
  }