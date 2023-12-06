import { Apis } from '@/common/Constants'
import IApiResponse from '@/interfaces/api/IApiResponse'
import axiosInstance from '@/configs/AxiosConfig'
import { ILoginResponse } from '@/interfaces/auth/ILoginResponse'
import { AxiosResponse } from 'axios'
import { cookieService } from '@/services/CookieService'
import { IRefreshTokenResponse } from '@/interfaces/auth/IRefreshTokenResponse'

export const authService = {
  async requestLogin(username: string, password: string): Promise<ILoginResponse> {
    const reqParams = {
      email: username,
      password: password,
    }
    const response: AxiosResponse<IApiResponse<ILoginResponse>> = await axiosInstance.post(Apis.login, reqParams)
    return response.data.data
  },
  async refreshToken(): Promise<IRefreshTokenResponse> {
    const refreshToken = cookieService.getRefreshToken()
    const reqParams = {
      refreshToken,
    }
    const response: AxiosResponse<IApiResponse<IRefreshTokenResponse>> = await axiosInstance.post(Apis.refreshToken, reqParams)
    return response.data.data
  },
  async validateToken(): Promise<boolean> {
    const response: AxiosResponse<IApiResponse<boolean>> = await axiosInstance.post(Apis.validateToken)
    return response.data.data
  },
}
