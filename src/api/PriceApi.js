import api from "../config/axios";
const getServiceCostByFacilityAndServiceType = async (facilityId,serviceTypeId,pageNumber,pageSize) => {
    try {
      const response = await api.get(
        `/service-cost-history/get-service-cost-by-facility-Id-and-service-type/${facilityId}/${serviceTypeId}/${pageNumber}/${pageSize}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  

  const getSellPriceByFacilityAndServiceType = async (facilityId,serviceTypeId,pageNumber,pageSize) => {
    try {
      const response = await api.get(
        `/sell-price/get-sell-price-by-facility-Id-and-service-type/${facilityId}/${serviceTypeId}/${pageNumber}/${pageSize}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  

  export {getServiceCostByFacilityAndServiceType,getSellPriceByFacilityAndServiceType}