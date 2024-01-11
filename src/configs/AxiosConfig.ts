// src/api/axios-config.ts

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { printLog } from '@/utils/LogUtil'
import IApiResponse from '@/interfaces/api/IApiResponse'
import { ApiErrorCode, HttpStatusCode } from '@/common/Constants'
import { authService } from '@/services/AuthService'
import { cookieService } from '@/services/CookieService'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

const retryRequests = new Map()

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Authorization 헤더를 요청 구성에 추가
    const accessToken = cookieService.getAccessToken()
    config.headers.Authorization = `Bearer ${accessToken}`

    printLog('Request:', config) // 요청 내용을 로깅
    return config
  },
  (error: AxiosError) => {
    printLog('Request Error:', error) // 요청 에러를 로깅
    return Promise.reject(error)
  },
)

// UNAUTHORIZED 에러 처리 함수
async function handleUnauthorizedError(error: AxiosError) {
  const originalRequest = error.config
  const requestKey = JSON.stringify(originalRequest)

  if (shouldRetryRequest(originalRequest, requestKey)) {
    return retryRequest(originalRequest, requestKey)
  }

  return Promise.reject(error)
}

// 재시도 여부 판단 함수
function shouldRetryRequest(request: any, requestKey: string): boolean {
  if (!request._retryCount) request._retryCount = 0
  if (request._retryCount >= 3 || retryRequests.has(requestKey)) {
    if (request._retryCount >= 3) {
      printLog('555555')
      // 모든 쿠키 삭제
      deleteAllCookies()
      // 홈페이지로 리다이렉트
      window.location.href = '/'
    }
    printLog('!@@!#!@#!#')
    return false // 재시도 횟수 초과 또는 중복 요청
  }

  request._retryCount++
  retryRequests.set(requestKey, true)
  return true
}

// 모든 쿠키 삭제 함수
function deleteAllCookies() {
  const cookies = document.cookie.split(';')

  for (let cookie of cookies) {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  }
}

// 요청 재시도 함수
async function retryRequest(request: any, requestKey: string) {
  try {
    const refreshSuccess = await authService.refreshToken()
    if (refreshSuccess) {
      retryRequests.delete(requestKey)
      return axiosInstance(request) // 요청 재시도
    }
  } catch (refreshError) {
    retryRequests.delete(requestKey)
    return Promise.reject(refreshError)
  }
}

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<IApiResponse<any>>) => {
    printLog('Response:', response)
    return response
  },
  (error: AxiosError<IApiResponse<any>>) => {
    if (error.response?.data.statusCode === HttpStatusCode.UNAUTHORIZED || error.response?.data.statusCode === HttpStatusCode.BAD_REQUEST) {
      return handleUnauthorizedError(error)
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
