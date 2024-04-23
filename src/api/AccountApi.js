import api from "../config/axios";

const getAllAccount = async (pageNumber, pageSize) => {
  try {
    const response = await api.get(`/account/get-all-account?pageIndex=${pageNumber}&pageSize=${pageSize}`);
    return response;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return []; 
  }
};

export { 
    getAllAccount
};
