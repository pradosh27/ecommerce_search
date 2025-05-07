import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchProducts = async (searchTerm = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { search: searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};