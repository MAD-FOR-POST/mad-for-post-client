import Layout from '@/components/layout'
import { BackButton } from '@/components/ui/button/BackButton'
import { promptSelection } from '@/stores/UserInfoAtom'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { IPostingOPtion } from '@/interfaces/post/IPostingOption'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/common/Constants'

const PostingOption: IPostingOPtion[] = [
  {
    index: 0,
    title: '홍보',
    prompt: '홍보',
  },
  {
    index: 1,
    title: '정보제공',
    prompt: '정보제공',
  },
  {
    index: 2,
    title: '일상 기록',
    prompt: '일상 기록',
  },
  {
    index: 3,
    title: '기타',
    prompt: '기타',
  },
]

export default function Select() {
  const router = useRouter()

  const [prompt, setPrompt] = useRecoilState(promptSelection)

  const { register, handleSubmit } = useForm()

  const [isExtra, setIsExtra] = useState(false)
  const onOptionClick = (data: IPostingOPtion) => {
    if (data.index === 3) {
      setIsExtra(true)
    } else {
      setIsExtra(false)
      onNextClick(data)
    }
  }
  const onNextClick = (data?: any) => {
    if (data && isExtra) {
      setPrompt({ ...PostingOption[3], prompt: data.ExtraPrompt })
    } else {
      setPrompt(data)
    }
    router.push(AppRoutes.inputTextKeyword)
  }

  return (
    <Layout>
      <div className={'flex flex-col justify-between items-center bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9 relative '}>
        <div className="flex w-full items-center justify-between px-5">
          <BackButton />
        </div>
        <div className={`h-full w-full flex flex-col  items-center justify-${isExtra ? 'between' : 'center'}  p-5 `}>
          <div className="flex flex-col w-full items-center justify-center h-1/5">
            <div className="flex  text-2xl font-bold my-2 ">포스팅의 목적을 알려주세요!</div>
            <ul className="flex w-full text-xl gap-3 font-semibold items-center justify-center my-2 ">
              {PostingOption.map((option) => (
                <div
                  key={option.index}
                  className={`px-4 py-2 ${isExtra && option.index === 3 ? 'bg-[#D58080]' : 'bg-white'} rounded-xl cursor-pointer `}
                  onClick={() => onOptionClick(option)}
                >
                  {option.title}
                </div>
              ))}
            </ul>
          </div>

          {isExtra && (
            <div className="w-full  text-xl font-bold h-4/5 pt-20">
              <div className="flex flex-col justify-center items-center text-[#262A2F] py-4">
                <div>'기타'를 선택하셨네요</div>
                <div className="text-center">
                  어떤 목적으로 포스팅을 하실건지
                  <br /> 직접 입력해주세요.
                </div>
              </div>
              <form onSubmit={handleSubmit(onNextClick)}>
                <input type="text" placeholder="예시) 신규 앱 소개" className="w-full p-2 rounded-lg my-4" {...register('ExtraPrompt')} />
                <button className="w-full text-white bg-[#303841] text-center py-4 rounded-full">입력 완료</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
