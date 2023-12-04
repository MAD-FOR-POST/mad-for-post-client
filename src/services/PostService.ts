import axiosInstance from '@/configs/AxiosConfig'
import { IPost } from '@/interfaces/post/IPost'
import { IGeneratePostRequest } from '@/interfaces/post/IGeneratePostRequest'
import IApiResponse from '@/interfaces/api/IApiResponse'
import { printLog } from '@/utils/LogUtil'

export const postService = {
  async getPosts(): Promise<IPost[]> {
    const response = await axiosInstance.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
    return response.data
  },
  async getPost(id: number): Promise<IPost> {
    const response = await axiosInstance.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return response.data
  },
  async generatePost(params: IGeneratePostRequest): Promise<string> {
    const response = await axiosInstance.post<IApiResponse<string>>(`/api/v1/posts`, params)
    printLog(`response.data.data ${response.data.data}`)
    return response.data.data
  },
}
