// src/api/apiUtils.ts

import axiosInstance from './axios'

const apiUtils = {
  // GET 요청
  get: async (url: string, params?: any) => {
    try {
      const response = await axiosInstance.get(url, { params })
      return response.data
    } catch (error) {
      // 여기에서 에러 처리
      throw error
    }
  },

  // POST 요청
  post: async (url: string, data: any) => {
    try {
      const response = await axiosInstance.post(url, data)
      return response.data
    } catch (error) {
      // 여기에서 에러 처리
      throw error
    }
  },

  // PUT 요청
  put: async (url: string, data: any) => {
    try {
      const response = await axiosInstance.put(url, data)
      return response.data
    } catch (error) {
      // 여기에서 에러 처리
      throw error
    }
  },

  // DELETE 요청
  delete: async (url: string) => {
    try {
      const response = await axiosInstance.delete(url)
      return response.data
    } catch (error) {
      // 여기에서 에러 처리
      throw error
    }
  },
}

export default apiUtils
