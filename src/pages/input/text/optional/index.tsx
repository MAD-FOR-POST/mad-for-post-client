import { useRouter } from 'next/router'
import { useState, useEffect, ChangeEvent } from 'react'
import { NextButton } from '@/components/ui/button/NextButton'
import { BackButton } from '@/components/ui/button/BackButton'
import { KeywordInput } from '@/components/ui/keyword/KeywordInput'
import { KeywordList } from '@/components/ui/keyword/KeywordList'
import { AppRoutes } from '@/common/Constants'
import { useRecoilState } from 'recoil'
import { userInputTextsAtom } from '@/stores/UserInfoAtom'
import { SizedBox } from '@/components/ui/box/SizedBox'
import Layout from '@/components/layout'
import { TitleText } from '@/components/ui/typography/TitleText'
export default function TextOptionalPage() {
  const router = useRouter()
  const [textareaValue, setTextareaValue] = useState('')
  //recoil 써서 keyword와 detail값 넣기
  const [userInput, setUserInput] = useRecoilState(userInputTextsAtom)

  const { keywords, detail } = userInput

  const onGoToImage = () => {
    router.push(AppRoutes.inputImage)
  }

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newDetail = e.target.value
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      detail: newDetail,
    }))
    setTextareaValue(newDetail)
  }

  useEffect(() => {
    console.log('리코일되나확인useEffect로', userInput)
  }, [userInput])

  return (
    <Layout>
      <div className={'flex flex-col justify-between items-center bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9 relative '}>
        <BackButton />
        <TitleText>Give me words</TitleText>
        <div className={'relative w-full'}>
          <img src='/images/FormBackgroundTop.png'/>
          <div className={'flex flex-col items-center  w-full bg-white bg-opacity-50'}>
              <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[300px] mt-[14px] px-[40px] pt-[12px] pb-[24px] mb-[104px]'}>
                <div className={'text-[#262A2F] text-[14px] font-bold text-center  mb-[16px]'}>Any more detail?(optional)</div>
                <textarea
                  style={{ resize: 'none' }}
                  className={'flex-grow h-full text-[16px] focus:outline-none hide-scrollbar'}
                  placeholder="Add more detail about keywords."
                  name="detail"
                  value={userInput.detail}
                  onChange={handleTextareaChange}
                ></textarea>
              </div>
              <NextButton onClick={onGoToImage}>Done</NextButton>

          </div>
        </div>
      </div>
    </Layout>
  )
}
