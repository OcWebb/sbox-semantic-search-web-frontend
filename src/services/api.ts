import { SearchRequest } from "../Interfaces";
import { Package } from "../Interfaces/Package";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const searchAPI = {
  search: async (requestBody: SearchRequest): Promise<Package[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/search/`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`API error (${response.status}): ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error; // Re-throw to let the component handle it
    }
  }
}; 