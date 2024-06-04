import api from "../config/axios";

const getMenuByFacilityId = async (facilityId, pageNumber, pageSize) => {
  try {
    const response = await api.get(
      `/menu/get-menu-by-facility/${facilityId}/${pageNumber}/${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menus:", error);
    return [];
  }
};
const getDishListByMenuId = async (menuId) => {
  try {
    const response = await api.get(`/get-dish-list-by-menu-id/${menuId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menus:", error);
    return [];
  }
};
export { getMenuByFacilityId, getDishListByMenuId };
