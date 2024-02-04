import { Apis } from '@/common/Constants'
import IApiResponse from '@/interfaces/api/IApiResponse'
import axiosInstance from '@/configs/AxiosConfig'
import { ILoginResponse } from '@/interfaces/auth/ILoginResponse'
import { AxiosResponse } from 'axios'
import { cookieService } from '@/services/CookieService'
import { IRefreshTokenResponse } from '@/interfaces/auth/IRefreshTokenResponse'
import { printLog } from '@/utils/LogUtil'

export const authService = {
  async requestLogin(username: string): Promise<ILoginResponse> {
    const reqParams = {
      email: username,
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
    cookieService.setAccessToken(response.data.data.accessToken ?? '')
    cookieService.setRefreshToken(response.data.data.refreshToken ?? '')
    return response.data.data
  },
  async validateToken(): Promise<boolean> {
    const response: AxiosResponse<IApiResponse<boolean>> = await axiosInstance.post(Apis.validateToken)
    return response.data.data
  },
  async validateEntryPointPassword(password: string): Promise<boolean> {
    const params = {
      password,
    }
    const response: AxiosResponse<IApiResponse<boolean>> = await axiosInstance.post(Apis.validateEntryPointPassword, params)
    return response.data.data
  },
}
