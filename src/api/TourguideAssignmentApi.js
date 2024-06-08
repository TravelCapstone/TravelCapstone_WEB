import api from "../config/axios";

export const getAvailableTourguide = async (
  provinceId,
  startTime,
  endTime,
  pageNumber,
  pageSize
) => {
  try {
    const response = await api.get(
      `/tour-guide-assignment/get-available-tour-guide/${provinceId}?startDate=${startTime}&endDate=${endTime}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sell price:", error);
    return [];
  }
};
