import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { requestBaseURL } from '@/const';
import Cookies from "js-cookie";


// 创建一个 Axios 实例
const api: AxiosInstance = axios.create({
  baseURL: `${requestBaseURL}`, // 设置基本的 URL
  timeout: 5000, // 设置请求超时时间
});

// 添加请求拦截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
  // 在发送请求之前做一些处理，例如添加认证信息等
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据进行处理，例如解析数据等
    return response.data;
  },
  (error: any) => {
    // 处理响应错误
    if (error.response) {
      // 响应状态码不是 2xx 的情况
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    } else if (error.request) {
      // 没有收到响应的情况
      console.log('No response received:', error.request);
    } else {
      // 其他错误情况
      console.log('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;