import axios from 'axios';

const API_BASE_URL = 'https://7f2a-103-204-189-64.ngrok-free.app'; // Replace with your API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

const FetchAPI = async (
  method: string,
  endpoint: string,
  data = null,
  headers = {},
) => {
  try {
    const config = {
      method,
      url: endpoint,
      data,
      headers,
    };

    const response = await api.request(config);
    return response.data;
  } catch (error) {
    // Handle error here
    console.error('API error:', error);
    throw new Error('API request failed');
  }
};

export default FetchAPI;
