import { useRouter } from 'next/router'
import { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { NextButton } from '@/components/ui/button/NextButton'
import { BackButton } from '@/components/ui/button/BackButton'
import { KeywordInput } from '@/components/ui/keyword/KeywordInput'
import { KeywordList } from '@/components/ui/keyword/KeywordList'
import { AppRoutes } from '@/common/Constants'
import { useRecoilState } from 'recoil'
import { gptResultsAtom, userInputTextsAtom } from '@/stores/UserInfoAtom'
import { SizedBox } from '@/components/ui/box/SizedBox'
import Layout from '@/components/layout'
import { TitleText } from '@/components/ui/typography/TitleText'
import { useMutation } from 'react-query'
import { postService } from '@/services/PostService'
import Loading from '@/components/ui/loading/Loading'
import { FloatingButton } from '@/components/ui/button/FloatingButton'

export default function TextKeywordPage() {
  const [typedKeyword, setTypedKeyword] = useState('') //리스트 안에 각각
  const router = useRouter()
  //recoil 써서 keyword와 detail값 넣기
  const [userInput, setUserInput] = useRecoilState(userInputTextsAtom)
  const [isModalOpen, setModalOpen] = useState(false)
  const { keywords, detail } = userInput

  const [isLoading, setIsLoading] = useState(false)

  const { mutate: generatePostMutate, isLoading: gptLoading, error: gptDataFetchError, data: gptTextResult } = useMutation(postService.generatePost)
  const { mutate: generateImageMutate, isLoading: gptImgLoading, error: gptImgDataFetchError, data: gptImageResults } = useMutation(postService.generateImages)

  const [gptResults, setGPTResults] = useRecoilState(gptResultsAtom)

  const onEnterKeyDown = () => {
    setUserInput({
      ...userInput,
      keywords: keywords.concat([typedKeyword]),
    })

    setTypedKeyword('')
  }

  const onRemoveKeywordButtonClicked = (index: number) => {
    setUserInput((currentInput) => {
      const newKeywords = [...currentInput.keywords]
      newKeywords.splice(index, 1)

      return {
        ...currentInput,
        keywords: newKeywords,
      }
    })
  }

  const onGPTGenerateButtonClicked = async () => {
    if (keywords.length < 3) {
      setModalOpen(true)
      return
    }
    setIsLoading(true)
    // Promises for text and image data

    try {
      // Wait for both promises to resolve
      await Promise.all([
        generatePostMutate({
          keywords: userInput.keywords.toString(),
          description: userInput.detail ? userInput.detail : '.',
        }),
        generateImageMutate({
          keywords: userInput.keywords.toString(),
          description: userInput.detail ? userInput.detail : '.',
        }),
      ])

      // !gptLoading && router.push(AppRoutes.resultPage)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const updateResultsAndNavigate = useCallback(
    (images: string[]) => {
      setGPTResults((prevResults) => ({
        ...prevResults,
        text: gptTextResult,
        image: images,
      }))
    },
    [gptTextResult, setGPTResults],
  )

  useEffect(() => {
    //사용자가 선택한 이미지가 없는 경우: 텍스트만 기다린다.
    if (gptTextResult && gptImageResults) {
      updateResultsAndNavigate([...gptImageResults])
      router.push(AppRoutes.inputImage)
      return
    }
  }, [gptTextResult, gptImageResults])

  const onDetailClick = () => {
    console.log('clicked')
    router.push(AppRoutes.inputTextOptional)
  }

  return (
    <Layout>
      {!isLoading ? (
        <div className={'flex flex-col justify-between items-center bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9 relative '}>
          <div className="flex w-full items-center justify-between px-5">
            <BackButton />
            <FloatingButton text="Add more detail" onClick={onDetailClick} />
          </div>
          <TitleText>Give me words</TitleText>
          <div className={'relative w-full'}>
            <img src="/images/FormBackgroundTop.png" />
            <div className={'flex flex-col items-center  w-full bg-white bg-opacity-50'}>
              <div className={'relative flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[150px] px-[10px] py-[11px] mb-[104px]'}>
                <div className={'text-center'}>
                  <p className={'text-[#262A2F] text-[14px] font-bold '}>Keywords</p>
                </div>
                {userInput.keywords.length < 10 && <KeywordInput keyword={typedKeyword} setPutKeyword={setTypedKeyword} onEnterKeyDown={onEnterKeyDown} />}
                <SizedBox height={12} />
                <KeywordList keywords={userInput.keywords} onRemoveKeywordButtonClicked={onRemoveKeywordButtonClicked} />
                {isModalOpen && <div className="text-[#E71C40] text-[14px] text-center  bottom-0 w-full">Minimum 3 to Maximum 10 keywords needed</div>}
              </div>
              <NextButton onClick={onGPTGenerateButtonClicked}>Done</NextButton>
            </div>
          </div>
        </div>
      ) : (
        <Loading setIsLoading={setIsLoading} />
      )}
    </Layout>
  )
}
