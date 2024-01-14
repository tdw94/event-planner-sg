import axios from 'axios';
import { BASE_URL } from '@env';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

export const get = async (url) => {
  return await instance.get(url);
};

export const post = async (url, data) => {
  return await instance.post(url, data);
};
