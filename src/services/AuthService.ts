import { Apis } from '@/common/Constants'
import IApiResponse from '@/interfaces/api/IApiResponse'
import axiosInstance from '@/configs/AxiosConfig'
import { ILoginResponse } from '@/interfaces/auth/ILoginResponse'
import { AxiosResponse } from 'axios'

export const authService = {
  async requestLogin(username: string, password: string): Promise<ILoginResponse> {
    const reqParams = {
      username,
      password,
    }
    const response: AxiosResponse<IApiResponse<ILoginResponse>> = await axiosInstance.post(Apis.login, reqParams)
    return response.data.data
  },
  async refreshToken(): Promise<boolean> {
    return true
  },
}
