import axiosInstance from '@/configs/AxiosConfig'
import { IPost } from '@/interfaces/post/IPost'
import { IGeneratePostRequest } from '@/interfaces/post/IGeneratePostRequest'
import IApiResponse from '@/interfaces/api/IApiResponse'
import { printLog } from '@/utils/LogUtil'
import { Apis } from '@/common/Constants'

export const postService = {
  async getPosts(): Promise<IPost[]> {
    const response = await axiosInstance.get<IApiResponse<IPost[]>>(Apis.getPosts)
    return response.data.data
  },
  async getPost(id: number): Promise<IPost> {
    const response = await axiosInstance.get<IApiResponse<IPost>>(Apis.getPost(id))
    return response.data.data
  },
  async generatePost(params: IGeneratePostRequest): Promise<string> {
    const response = await axiosInstance.post<IApiResponse<string>>(Apis.writePost, params)
    printLog(`response.data.data ${response.data.data}`)
    return response.data.data
  },
}
