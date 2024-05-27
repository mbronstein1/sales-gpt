/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: '/api',
});

axiosApi.defaults.withCredentials = false;
axiosApi.defaults.headers.common['Authorization'] = `Bearer `;
axiosApi.defaults.headers.common['Accept'] = `application/json`;

export async function get(url: string, config = {}) {
  return await axiosApi?.get(url, { ...config });
}

export async function post(url: string, data: any, config = {}) {
  return await axiosApi?.post(url, { ...data }, { ...config });
}

export async function put(url: string, data: any, config = {}) {
  return await axiosApi?.put(url, { ...data }, { ...config });
}

export async function del(url: string, config = {}) {
  return await axiosApi?.delete(url, { ...config });
}
