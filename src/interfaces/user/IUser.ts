import { IRole } from '@/interfaces/role/IRole'

export interface IUser {
  id?: number
  nickName?: string
  email?: string
  createdAt?: Date
  updatedAt?: Date
  roles: IRole[]
}
