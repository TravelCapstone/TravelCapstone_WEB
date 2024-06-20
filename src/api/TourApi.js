import api from "../config/axios";

const createTour = async (data) => {
  try {
    const response = await api.post(`/tour/create-tour`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};
export const getPlanByTourId = async (tourId) => {
  try {
    const response = await api.get(`/tour/get-plan-by-tour/${tourId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};
export const calculatePlanCost = async (data) => {
  try {
    const response = await api.post(`/tour/calculate-plan-cost`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};

export const getAllTour = async (pageNumber, pageSize) => {
  try {
    const response = await api.get(`/tour/get-all/${pageNumber}/${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};

export const getIdTour = async (id) => {
  try {
    const response = await api.get(`/tour/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};


export { createTour };
