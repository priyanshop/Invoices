import axios from 'axios';

const API_BASE_URL = 'http://15.236.207.148:4000'; // Replace with your API base URL

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
