import api from "../config/axios"; // Adjust the import path accordingly

const fetchEventListWithQuantity = async (quantity) => {
  try {
    const response = await api.get(
      `/event/get-event-list-with-quantity?quantity=${quantity}`
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching event list:", error);
    return [];
  }
};


export { fetchEventListWithQuantity };