import Layout from '@/components/layout'
import { BackButton } from '@/components/ui/button/BackButton'
import { promptSelection } from '@/stores/UserInfoAtom'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { IPostingOPtion } from '@/interfaces/post/IPostingOption'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/common/Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const PostingOption: IPostingOPtion[] = [
  {
    index: 0,
    title: '아이템/사업을 홍보하고 싶어요',
    prompt: '홍보',
  },
  {
    index: 1,
    title: '정보를 제공하고 싶어요',
    prompt: '정보제공',
  },
  {
    index: 2,
    title: '일상을 기록하고 싶어요',
    prompt: '일상 기록',
  },
  {
    index: 3,
    title: '직접 입력하고 싶어요',
    prompt: '기타',
  },
]

export default function Select() {
  const router = useRouter()

  const [prompt, setPrompt] = useRecoilState(promptSelection)

  const { register, handleSubmit } = useForm()
  const [input, setInput] = useState('')

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
      setPrompt({ ...PostingOption[3], prompt: input })
    } else {
      setPrompt(data)
    }
    router.push(AppRoutes.inputTextKeyword)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setInput(event.target.value)
  }
  return (
    <Layout>
      <div className={'flex flex-col justify-start items-center bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9 relative  '}>
        <div className="flex w-full items-center justify-between px-5">
          <BackButton />
        </div>
        <div className={` w-full flex flex-col  items-center justify-${isExtra ? 'between' : 'center'}  p-5 `}>
          <div className="flex flex-col h-full w-full items-center justify-center ">
            <div className="flex  text-2xl font-bold my-2 mb-12 ">어떤 포스팅을 만들고 싶나요?</div>
            <ul className="flex flex-col w-full text-xl gap-5 font-semibold items-center justify-center my-2 ">
              {PostingOption.map((option) => (
                <div
                  key={option.index}
                  className={` w-full px-4 py-2 ${
                    isExtra && option.index === 3 ? '  rounded-3xl border-red-400 border-4  bg-opacity-50 bg-white' : 'bg-white rounded-full'
                  }  cursor-pointer px-8 py-2 `}
                  onClick={() => onOptionClick(option)}
                >
                  {option.title}

                  {isExtra && option.index === 3 && (
                    <>
                      <span className="absolute right-10 text-red-400">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <div className="w-full  text-xl font-bold   ">
                        <form onSubmit={handleSubmit(onNextClick)}>
                          <div className="flex items-center w-full">
                            <input
                              type="text"
                              value={input}
                              maxLength={20}
                              placeholder=" 신규 앱 소개"
                              className="w-full p-2 rounded-lg my-4  pr-16"
                              onChange={handleInputChange}
                            />
                            <div className={`absolute right-16 text-xs ${input.length === 20 && 'text-red-400'}`}>{input.length}/20자</div>
                          </div>
                          <div className="absolute w-full left-0 bottom-0 px-5">
                            <button className=" bottom-0 left-0  w-full text-white bg-[#303841] text-center py-4 rounded-full">완료</button>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
