import api from "../config/axios";
import { saveAs } from "file-saver";

export const getIdOptionsRequest = async (id) => {
  try {
    const response = await api.get(`/get-private-tour-request-by-id/${id}`);

    if (!response.data.isSuccess) {
      const error = new Error(
        response.data.message || "An error occurred while fetching the data"
      );
      error.data = response.data;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error("Error while fetching options:", error);
    throw error;
  }
};

export const createOptionsPrivateTour = async (optionsData) => {
  try {
    const response = await api.post(
      `/create-options-private-tour`,
      optionsData
    );

    if (!response.data.isSuccess) {
      const error = new Error(
        response.data.message || "An error occurred while posting the data"
      );
      error.data = response.data;
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error("Error while creating options:", error);
    throw error;
  }
};

export const getExcelQuotation = async (id) => {
  try {
    const response = await api.get(`/get-excel-quotation/${id}`, {
      responseType: "blob", // Important
    });

    const blob = new Blob([response.data], {
      type: "application/zip",
    });
    saveAs(blob, "quotation.zip");
  } catch (error) {
    console.error("Error while creating options:", error);
    throw error;
  }
};
export const confirmOption = async (id, accountId) => {
  try {
    const response = await api.post(
      `/confirm-options-private-tour?optionId=${id}&accountId=${accountId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while creating options:", error);
    throw error;
  }
};
