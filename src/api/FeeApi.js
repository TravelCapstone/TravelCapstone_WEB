import api from "../config/axios";
export const getOperationFees = async (data) => {
  try {
    const response = await api.get(
      `/manage-fee-reference/get-operation-fees/${data}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};
