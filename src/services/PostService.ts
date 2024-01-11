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
    const response = await axiosInstance.post<IApiResponse<string>>(Apis.generatePost, params)
    printLog(`response.data.data ${response.data.data}`)
    return response.data.data
  },
  // DALL-E이미지 요청 (사용안함) -> string은 base64스트링
  async generateImage(params: IGeneratePostRequest): Promise<string> {
    const response = await axiosInstance.post<IApiResponse<string>>(Apis.generateImage, params)
    return response.data.data
  },
  // Stable Diffusion 이미지 요청 -> string[]은 url 리스트
  async generateImages(params: IGeneratePostRequest): Promise<string[]> {
    const response = await axiosInstance.post<IApiResponse<string[]>>(Apis.generateImages, params)
    return response.data.data
  },
}
