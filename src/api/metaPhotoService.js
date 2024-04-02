import axios from 'axios';

const BASE_URL = "https://photo-technical-test.onrender.com/api/photos";

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
