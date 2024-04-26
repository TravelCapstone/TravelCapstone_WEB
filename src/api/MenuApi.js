import api from "../config/axios";

const getMenuByFacilityId = async (facilityId, pageNumber,pageSize)=>{
    try {
        const response = await api.get(`/menu/get-menu-by-facility/${facilityId}/${pageNumber}/${pageSize}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching provinces:', error);
        return []; 
      }
}
export {getMenuByFacilityId}