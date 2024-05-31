import api from "../config/axios"; // Adjust the import path accordingly

const fetchEventListWithQuantity = async (quantity) => {
  try {
    const response = await api.get(
      `/event/get-event-list-with-quantity?quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching event list:", error);
    return [];
  }
};

const updateEventDetails = async (eventId, eventDetails) => {
  try {
    const response = await api.post(`/event/create-custom-event-string`, {
      eventId,
      eventDetailPriceHistoryRequests: eventDetails
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event details:", error);
  }
};


export { fetchEventListWithQuantity, updateEventDetails};
