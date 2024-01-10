import { atom } from 'recoil'
import { IUser } from '@/interfaces/user/IUser'
import { IInputTexts } from '@/interfaces/post/IInputTexts'
import { IGptResults } from '@/interfaces/post/IGptResults'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

// 로그인 상태를 나타내는 atom
export const userInfoAtom = atom<IUser | null>({
  key: 'userAtom', // 고유한 키
  default: null, // 기본값
})

export const userInputImagesAtom = atom<string[]>({
  key: 'InputImages',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const userInputTextsAtom = atom<IInputTexts>({
  key: 'InputTexts',
  default: { keywords: [], detail: '' },
  effects_UNSTABLE: [persistAtom],
})

export const gptResultsAtom = atom<IGptResults>({
  key: 'GptTextResult',
  default: { image: [], text: '' },
  effects_UNSTABLE: [persistAtom],
})

export const gptImageResultIndexArrayAtom = atom<number[]>({
  key: 'GptImageResultArray',
  default: [],
  effects_UNSTABLE: [persistAtom],
})
