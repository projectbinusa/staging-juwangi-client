import useSWR from 'swr';
import axios from 'axios';

const API_URL = 'http://localhost:4322/api/cart';

async function fetcher(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  }

  export function useGetCart() {
    const { data, error, isLoading } = useSWR(API_URL, fetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    });
  
    return {
      cartLoading: isLoading,
      cart: data,           
      cartError: error      
    };
  }

export const getAllCart = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addCart = async (productId) => {
  const response = await axios.post(`${API_URL}/${productId}`);
  return response.data;
};

export const removeCart = async (cartId) => {
  const response = await axios.delete(`${API_URL}/${cartId}`);
  return response.data;
};

export const updateCartProduct = async (id, quantity) => {
  const response = await axios.put(`${API_URL}/${id}`, { quantity });
  return response.data;
};

export const setCheckoutStep = async (step) => {
  const response = await axios.patch(API_URL, { step });
  return response.data;
};
