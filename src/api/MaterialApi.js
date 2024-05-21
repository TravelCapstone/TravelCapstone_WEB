import api from "../config/axios"; // Adjust the import path accordingly

const fetchMaterialList = async () => {
  try {
    const response = await api.post("/get-material-list-price");
    return response.data.result;
  } catch (error) {
    console.error("Error fetching material list:", error);
    return [];
  }
};


export { fetchMaterialList };