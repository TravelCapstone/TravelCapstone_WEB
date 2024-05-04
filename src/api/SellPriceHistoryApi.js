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
export { getAveragePriceOfService, getAveragePriceOfMealService };
