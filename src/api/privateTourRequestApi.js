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

export { getAllProvince };
