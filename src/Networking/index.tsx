import axios from 'axios';

export const API_BASE_URL = 'http://15.236.207.148:4000'; // Replace with your API base URL
export const IMAGE_BASE_URL =
  'https://invoice-app-assets.s3.eu-west-3.amazonaws.com';
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
    console.log("ttete",response);
    
    return response.data;
  } catch (error) {
    // Handle error here
    if (error.response) {
      // Handle the specific error response from the server
      const errorData = error.response.data;
      if (error.response.status === 400) {
        // The server responded with a 400 status code, indicating an error
        console.error('API Error Response:', errorData.message);
      }
      console.error('API error:', errorData.message);
      throw new Error(errorData.message);
    }
  }
};

export default FetchAPI;
