import { useRouter } from 'next/router'
import { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { NextButton } from '@/components/ui/button/NextButton'
import { BackButton } from '@/components/ui/button/BackButton'

import { AppRoutes } from '@/common/Constants'
import { useRecoilState } from 'recoil'
import { gptResultsAtom, userInputTextsAtom } from '@/stores/UserInfoAtom'

import Layout from '@/components/layout'
import { TitleText } from '@/components/ui/typography/TitleText'
import { useMutation } from 'react-query'
import { postService } from '@/services/PostService'

import Loading from '@/components/ui/loading/Loading'
import { inputTextOptional } from '@/text'

export default function TextOptionalPage() {
  // const router = useRouter()
  // const [textareaValue, setTextareaValue] = useState('')
  // //recoil 써서 keyword와 detail값 넣기
  // const [userInput, setUserInput] = useRecoilState(userInputTextsAtom)
  // const [isLoading, setIsLoading] = useState(false)
  // const { mutate: generatePostMutate, isLoading: gptLoading, error: gptDataFetchError, data: gptTextResult } = useMutation(postService.generatePost)
  // const { mutate: generateImageMutate, isLoading: gptImgLoading, error: gptImgDataFetchError, data: gptImageResults } = useMutation(postService.generateImages)

  // const [gptResults, setGPTResults] = useRecoilState(gptResultsAtom)
  // const { kr: titleKr } = inputTextOptional.title;
  // const onGPTGenerateButtonClicked = async () => {
  //   //keyword가 없는 경우 GPT 생성을 할 수 없으므로, 키워드 입력 페이지로 이동한다.
  //   if (userInput.keywords.length === 0) {
  //     router.replace(AppRoutes.inputTextKeyword)
  //     alert('Please add keywords')
  //     return
  //   }
  //   setIsLoading(true)
  //   // Promises for text and image data

  //   try {
  //     // Wait for both promises to resolve
  //     await Promise.all([
  //       generatePostMutate({
  //         keywords: userInput.keywords.toString(),
  //         description: userInput.detail ? userInput.detail : '.',
  //       }),
  //       generateImageMutate({
  //         keywords: userInput.keywords.toString(),
  //         description: userInput.detail ? userInput.detail : '.',
  //       }),
  //     ])

  //     // !gptLoading && router.push(AppRoutes.resultPage)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   }
  // }

  // const updateResultsAndNavigate = useCallback(
  //   (images: string[]) => {
  //     setGPTResults((prevResults) => ({
  //       ...prevResults,
  //       text: gptTextResult,
  //       image: images,
  //     }))
  //   },
  //   [gptTextResult, setGPTResults],
  // )

  // useEffect(() => {
  //   //사용자가 선택한 이미지가 없는 경우: 텍스트만 기다린다.
  //   if (gptTextResult && gptImageResults) {
  //     updateResultsAndNavigate([...gptImageResults])
  //     router.push(AppRoutes.inputImage)
  //     return
  //   }
  // }, [gptTextResult, gptImageResults])

  // const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   const newDetail = e.target.value
  //   setUserInput((prevUserInput) => ({
  //     ...prevUserInput,
  //     detail: newDetail,
  //   }))
  //   setTextareaValue(newDetail)
  // }

  return (
    <Layout>
      {/* {!isLoading ? (
        <div className={'flex flex-col justify-between items-center bg-[#272727] w-full max-w-[428px] h-full pt-9 relative '}>
          <div className="flex w-full items-center justify-between px-5">
            <BackButton />
          </div>
          <TitleText color="#DDBCC5">{titleKr.kr1}<br/>{titleKr.kr2}</TitleText>
          <div className={'relative w-full'}>
            <img src="/images/FormBackgroundTop.png" />
            <div className={'flex flex-col items-center  w-full bg-white bg-opacity-50'}>
              <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[300px] mt-[14px] px-[40px] pt-[12px] pb-[24px] mb-[104px]'}>
                <div className={'text-[#262A2F] text-[14px] font-bold text-center  mb-[16px]'}>{inputTextOptional.inputTitle.kr}</div>
                <textarea
                  style={{ resize: 'none' }}
                  className={'flex-grow h-full text-[16px] focus:outline-none hide-scrollbar'}
                  placeholder={inputTextOptional.inputPlaceholder.kr}
                  name="detail"
                  value={userInput.detail}
                  onChange={handleTextareaChange}
                ></textarea>
              </div>
              <NextButton onClick={onGPTGenerateButtonClicked}>완료</NextButton>
            </div>
          </div>
        </div>
      ) : (
        <Loading setIsLoading={setIsLoading} />
      )} */}
      <></>
    </Layout>
  )
}
