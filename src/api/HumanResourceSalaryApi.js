import api from "../config/axios";

const postHumanResourceSalaryWithIsForTourguide = async (
  isForTourguide,
  data
) => {
  try {
    const response = await api.post(
      `/human-resource-salary/get-salary?isForTourguide=${isForTourguide}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error fetching salary data:", error);
    return [];
  }
};
export const getAvailableDriver = async (startTime, endTime) => {
  try {
    const response = await api.get(
      `/get-available-driver?startTime=${startTime}&endTime=${endTime}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching salary data:", error);
    return [];
  }
};

export { postHumanResourceSalaryWithIsForTourguide };
