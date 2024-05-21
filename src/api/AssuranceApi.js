import api from "../config/axios";


const getAvailableAssurancesWithNumOfDays = async (numOfDays) => {
      try {
        const response = await api.get(`/assurance/get-available-assurances-with-num-of-day?NumOfDay=${numOfDays}`);
        return response;
      } catch (error) {
        console.error('Error fetching assurances:', error);
        return [];
      }
    }
 
    export { 
        getAvailableAssurancesWithNumOfDays
    };