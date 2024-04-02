import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchPhotos = async (params = {}) => {
    try {
        const response = await axios.get(BASE_URL, { params });
        console.log("response.data", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
}

export const fetchPhotos3 = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};
