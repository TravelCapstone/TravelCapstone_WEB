import api from "../config/axios";

export const getIdOptionsRequest = async (id) => {
  try {
    const response = await api.get(`/get-private-tour-request-by-id/${id}`);

    if (!response.data.isSuccess) {
        const error = new Error(response.data.message || "An error occurred while fetching the data");
        error.data = response.data; 
        throw error;
      }

    return response.data;
  } catch (error) {
    console.error("Error while fetching options:", error);
    throw error;
  }
};
