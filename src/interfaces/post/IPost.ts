import { IUser } from '@/interfaces/user/IUser'

export interface IPost {
  id?: number
  keywords?: string
  result?: string
  createdAt?: Date
  updatedAt?: Date
  user?: IUser
}
