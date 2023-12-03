// src/api/axios-config.ts

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { printLog } from '@/utils/LogUtil'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Authorization 헤더를 요청 구성에 추가
    const jwt = process.env.NEXT_PUBLIC_ACCESS_TOKEN
    config.headers.Authorization = `Bearer ${jwt}`

    printLog('Request:', config) // 요청 내용을 로깅
    return config
  },
  (error: AxiosError) => {
    printLog('Request Error:', error) // 요청 에러를 로깅
    return Promise.reject(error)
  },
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    printLog('Response:', response) // 응답 내용을 로깅
    return response
  },
  (error: AxiosError) => {
    printLog('Response Error:', error) // 응답 에러를 로깅
    return Promise.reject(error)
  },
)

export default axiosInstance
