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

export { createTour };
