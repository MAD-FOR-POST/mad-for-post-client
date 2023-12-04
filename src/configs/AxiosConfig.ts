// src/api/axios-config.ts

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { printLog } from '@/utils/LogUtil'
import IApiResponse from '@/interfaces/api/IApiResponse'
import { ApiErrorCode } from '@/common/Constants'
import { authService } from '@/services/AuthService'

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
  (response: AxiosResponse<IApiResponse<any>>) => {
    printLog('Response:', response) // 응답 내용을 로깅
    return response
  },
  async (error: AxiosError<IApiResponse<any>>) => {
    const errorMessage = error.response?.data.message
    const statusCode = error.response?.data.statusCode

    //만료된 토큰
    if (statusCode === ApiErrorCode.EXPIRED_TOKEN) {
      printLog('토큰이 만료되었습니다.')
      const refreshSuccess = await authService.refreshToken()
      //다시 요청 (retry 최대 3번)
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
