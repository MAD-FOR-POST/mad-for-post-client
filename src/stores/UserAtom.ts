import { atom } from 'recoil'
import { IUserInfo } from '@/interfaces/user/IUserInfo'

// 로그인 상태를 나타내는 atom
export const userAtom = atom<IUserInfo | null>({
  key: 'userAtom', // 고유한 키
  default: null, // 기본값
})

export const userInputImages = atom<string[]>({
  key: 'InputImages',
  default: [],
})
