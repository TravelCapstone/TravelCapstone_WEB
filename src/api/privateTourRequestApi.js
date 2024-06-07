import api from "../config/axios";

const getAllProvince = async (data) => {
  try {
    const response = await api.get(
      `/get-all-province-by-private-tour-request-id/${data}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllPrivateTour = async (pageNumber, pageSize) => {
  try {
    const response = await api.get(
      `get-all-private-tour-request/${pageNumber}/${pageSize}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getPrivateTourById = async (id) => {
  try {
    const response = await api.get(`get-private-tour-request-by-id//${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createPrivateTour = async (tourData) => {
  try {
    const response = await api.post("/create-private-tour-request", tourData);
    return response;
  } catch (error) {
    console.error("Error creating private tour:", error);
    throw error;
  }
};

const getRoomSuggestion = async (data) => {
  try {
    const response = await api.post("/get-room-suggestion", data);
    return response;
  } catch (error) {
    console.error("Error getting room suggestion:", error);
    throw error;
  }
};

const getProvinceOfOption = async (optionid) => {
  try {
    const response = await api.get(`/get-province-of-option/${optionid}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getPrivateTourByIdForCustomer = async (id) => {
  try {
    const response = await api.get(
      `get-private-tour-request-by-id-for-customer/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllProvince,
  getAllPrivateTour,
  getPrivateTourById,
  createPrivateTour,
  getRoomSuggestion,
  getProvinceOfOption,
  getPrivateTourByIdForCustomer,
};
