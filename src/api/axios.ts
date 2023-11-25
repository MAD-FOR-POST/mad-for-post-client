// src/api/axios.ts

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('Request:', config) // 요청 내용을 로깅
    return config
  },
  (error: AxiosError) => {
    console.error('Request Error:', error) // 요청 에러를 로깅
    return Promise.reject(error)
  },
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response:', response) // 응답 내용을 로깅
    return response
  },
  (error: AxiosError) => {
    console.error('Response Error:', error) // 응답 에러를 로깅
    return Promise.reject(error)
  },
)

export default axiosInstance
