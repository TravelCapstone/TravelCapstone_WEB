import api from "../config/axios";

const getAvailableAssurancesWithNumOfDays = async (numOfDays) => {
  try {
    const response = await api.get(
      `/assurance/get-available-assurance-with-num-of-day?NumOfDay=${numOfDays}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching assurances:", error);
    return [];
  }
};

export { getAvailableAssurancesWithNumOfDays };
