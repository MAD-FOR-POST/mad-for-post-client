import { atom } from 'recoil'
import { IUser } from '@/interfaces/user/IUser'

// 로그인 상태를 나타내는 atom
export const userAtom = atom<IUser | null>({
  key: 'userAtom', // 고유한 키
  default: null, // 기본값
})

export const userInputImages = atom<string[]>({
  key: 'InputImages',
  default: [],
})

export const userInputTexts = atom({
  key: 'InputTexts',
  default: { keyword: [] as string[], detail: '' },
})
