import { Product } from '../types/product';
import { Comment } from '../types/comment';

const BASE_URL = 'https://my-json-server.typicode.com/novikovm18/JSON-server/';

export const request = async (url: string) => {
  const response = await fetch(url);

  return await response.json();
};

export const getAllProducts = async (): Promise<Product[]> => {
  const products = await request(`${BASE_URL}products`);

  return products;
};

export const getProductDetails = async (selectedProductId: number): Promise<Product> => {
  const product = await request(`${BASE_URL}products/${selectedProductId}`);
  
  return product;
};

export const deleteProduct = (id: number): Promise<Response> => {
  return fetch(`${BASE_URL}products/${id}`, { method: 'DELETE' });
};

export const getComments = async (selectedProductId: number): Promise<Comment[]> => {
  return request(`${BASE_URL}comments?productId=${selectedProductId}`);
};

export const deleteComment = (id: number): Promise<Response> => {
  return fetch(`${BASE_URL}comments/${id}`, { method: 'DELETE' });
};

export const addComment = (
  id: number,
  productId: number,
  description: string,
  date: string,
): Promise<Response> => {
  return fetch(`${BASE_URL}comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id,
      productId,
      description,
      date,
    }),
  });
};

export const addProduct = (
  id: number,
  imageUrl: string,
  name: string,
  count: number,
  width: number,
  height: number,
  weight: string,
): Promise<Response> => {
  return fetch(`${BASE_URL}products`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id,
      imageUrl,
      name,
      count,
      size: {width, height},
      weight,
    }),
  });
};