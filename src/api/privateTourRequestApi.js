import { callApi } from "../hook/useCallApi";

const getAllProvince = async (data) => {
  try {
    const response = await callApi(
      "GET",
      `/get-all-province-by-private-tour-request-id/${data}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getAllProvince };
