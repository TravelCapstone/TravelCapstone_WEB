import api from "../config/axios";


const getAllProvince = async () => {
  try {
    const response = await api.get('/location/get-all-province');
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return []; 
  }
};

const getProvinceByName = async (provinceName) => {
  try {
      const response = await api.get(`/location/get-province-by-name/${provinceName}`);
      if (response.data.isSuccess) {
          return response.data; 
      } else {
          throw new Error(response.data.messages.join(", ") || "Unknown error");
      }
  } catch (error) {
      console.error('Error fetching province by name:', error);
      throw error;
  }
};

const getAllDistrictsByProvinceId = async (provinceId) => {
  try {
    const response = await api.get(`/location/get-all-district-by-provinceId/${provinceId}`);
    return response.data.result.items; 
  } catch (error) {
    console.error('Error fetching districts by province ID:', error);
    throw error;
  }
};

const getAllCommunesByDistrictId = async (districtId) => {
  try {
    const response = await api.get(`/location/get-all-commune-by-districtId/${districtId}`);
    return response.data;  
  } catch (error) {
    console.error('Error fetching communes by district ID:', error);
    throw error;
  }
};
const getCommuneByDistrictAndCommuneName = async (districtName, communeName) => {
  try {
    const response = await api.get(`/location/get-all-commune-by-districtName-communeName/${encodeURIComponent(districtName)}/${encodeURIComponent(communeName)}`);
    return response.data;  
  } catch (error) {
    console.error('Error fetching commune by names:', error);
    throw error;
  }
};



const getAutoCompleteSuggestions = async (address) => {
  try {
    const response = await api.get('/api/map/auto-complete', {
      params: { address }
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    throw error; 
  }
};

export { 
  getAllProvince,
  getProvinceByName,
  getAllDistrictsByProvinceId,
  getAllCommunesByDistrictId,
  getCommuneByDistrictAndCommuneName, 
  getAutoCompleteSuggestions  
};
