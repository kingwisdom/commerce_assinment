import axios from "axios";
import { BASE_URL } from "./config";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = [BASE_URL];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchProductList = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `${BASE_URL}/product?page=${pageParam}`
  );

  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `${BASE_URL}/product/${id}`
  );

  return data;
};

export const postProduct = async (input) => {
  const { data } = await axios.post(
    `${BASE_URL}/product/`,
    input
  );

  return data;
};

export const fetcRegister = async (input) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/register`,
    input
  );

  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/login`,
    input
  );

  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/auth/me`
  );
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(
    `${BASE_URL}/order`,
    input
  );
  return data;
};

export const fetchOrders = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/order`
  );
  return data;
};

export const deleteProduct = async (product_id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/product/${product_id}`
  );

  return data;
};

export const updateProduct = async (input, product_id) => {
  const { data } = await axios.put(
    `${BASE_URL}/product/${product_id}`,
    input
  );

  return data;
};
