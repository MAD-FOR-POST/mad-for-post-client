import axiosInstance from '@/configs/axios-config'
import { IPost } from '@/interfaces/post/IPost'

export class PostService {
  async getPosts(): Promise<IPost[]> {
    const response = await axiosInstance.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
    return response.data
  }

  async getPost(id: number): Promise<IPost> {
    const response = await axiosInstance.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return response.data
  }
}
