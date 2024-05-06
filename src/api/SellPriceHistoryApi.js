import api from "../config/axios";

const getAveragePriceOfService = async (
  districtId,
  privatetourRequestId,
  ratingId,
  serviceType,
  servingQuantity,
  pageNumber,
  pageSize
) => {
  try {
    const response = await api.get(
      `/sell-price/get-average-price-of-service/${districtId}/${privatetourRequestId}/${ratingId}?serviceType=${serviceType}&servingQuantity=${servingQuantity}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getAveragePriceOfMealService = async (
  districtId,
  privatetourRequestId,
  ratingId,
  serviceType,
  mealType,
  servingQuantity,
  pageNumber,
  pageSize
) => {
  try {
    const response = await api.get(
      `/sell-price/get-average-price-of-meal-service/${districtId}/${privatetourRequestId}/${ratingId}?mealType=${mealType}&serviceType=${serviceType}&servingQuantity=${servingQuantity}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
<<<<<<< Updated upstream
export { getAveragePriceOfService, getAveragePriceOfMealService };
=======

// Retrieve sell price by facility service ID
const getSellPriceByFacilityServiceId = async (facilityServiceId) => {
    try {
      const response = await api.get(`/sell-price/get-sell-price-by-facility-service-id/${facilityServiceId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sell price:', error);
      return []; 
    }
  };
  
  // Retrieve sell price by menu ID
  const getSellPriceByMenuId = async (menuId) => {
    try {
      const response = await api.get(`/sell-price/get-sell-price-by-menu-id/${menuId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sell price:', error);
      return []; 
    }
  };
  
  // Retrieve sell price by transport service ID
  const getSellPriceByTransportServiceId = async (transportDetailId) => {
    try {
      const response = await api.get(`/sell-price/get-sell-price-by-transport-service-id/${transportDetailId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sell price:', error);
      return []; 
    }
  };
  
  // Retrieve sell price by facility ID and service type
  const getSellPriceByFacilityIdAndServiceType = async (facilityId, serviceTypeId, pageNumber, pageSize) => {
    try {
      const response = await api.get(`/sell-price/get-sell-price-by-facility-Id-and-service-type/${facilityId}/${serviceTypeId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sell price:', error);
      return []; 
    }
  };
  
  // Retrieve min and max price of a hotel
  const getMinMaxPriceOfHotel = async (districtId, privatetourRequestId, ratingId, pageNumber, pageSize) => {
      try {
        const response = await api.get(`/sell-price/get-min-max-price-of-hotel/${districtId}/${privatetourRequestId}/${ratingId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching hotel prices:', error);
        return []; 
      }
    };
    
    // Retrieve price of meal
    const getPriceOfMeal = async (districtId, privatetourRequestId, ratingId) => {
      try {
        const response = await api.get(`/sell-price/get-price-of-meal/${districtId}/${privatetourRequestId}/${ratingId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching meal prices:', error);
        return []; 
      }
    };
    
    // Retrieve price of vehicle
    const getPriceOfVehicle = async (districtId, privatetourRequestId) => {
      try {
        const response = await api.get(`/sell-price/get-price-of-vehicle/${districtId}/${privatetourRequestId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching vehicle prices:', error);
        return []; 
      }
    };
    
    // Retrieve reference transport by province
    const getReferenceTransportByProvince = async (startPoint, endPoint,vehicleType,pageNumber,pageSize) => {
      try {
        const response = await api.get(`/sell-price/get-reference-transport-by-province/${startPoint}/${endPoint}?vehicleType=${vehicleType}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching transport references:', error);
        return []; 
      }
    };
    
    // Retrieve attraction sell price range
    const getAttractionSellPriceRange = async (districtId, privateTourRequestId, numOfPlace, pageNumber, pageSize) => {
      try {
        const response = await api.get(`/sell-price/get-attraction-sell-price-range/${districtId}/${privateTourRequestId}/${numOfPlace}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching attraction prices:', error);
        return []; 
      }
    };
    
    
    
export { getAveragePriceOfService, getAveragePriceOfMealService, getSellPriceByFacilityServiceId, getSellPriceByMenuId, getSellPriceByTransportServiceId, getSellPriceByFacilityIdAndServiceType, getMinMaxPriceOfHotel, getPriceOfMeal, getPriceOfVehicle, getReferenceTransportByProvince, getAttractionSellPriceRange};
>>>>>>> Stashed changes
