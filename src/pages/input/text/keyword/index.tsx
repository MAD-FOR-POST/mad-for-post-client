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
import { KeywordModal } from '@/components/ui/modal/KeywordModal'

export default function TextKeywordPage() {
  const [typedKeyword, setTypedKeyword] = useState('') //리스트 안에 각각
  const router = useRouter()
  //recoil 써서 keyword와 detail값 넣기
  const [userInput, setUserInput] = useRecoilState(userInputTextsAtom)
  const [isModalOpen, setModalOpen] = useState(false)
  const { keywords, detail } = userInput

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

  const onGoToTextOptional = () => {
    if (keywords.length < 3) {
      setModalOpen(true)
      return
    }

    router.push(AppRoutes.inputTextOptional)
  }

  useEffect(() => {
    console.log('리코일되나확인useEffect로', userInput)
  }, [userInput])

  return (
    <Layout>
      <div className={'flex flex-col justify-between items-center bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9 relative '}>
        <div className="flex w-full items-center justify-between px-5">
          <BackButton />
          <button
            className="bg-white rounded-full py-2 px-[19px] font-bold shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
            onClick={() => {
              router.push(AppRoutes.inputTextOptional)
            }}
          >
            Add more detail
          </button>{' '}
        </div>
        <TitleText>Give me words</TitleText>
        <div className={'relative w-full'}>
          <img src="/images/FormBackgroundTop.png" />
          <div className={'flex flex-col items-center  w-full bg-white bg-opacity-50'}>
            <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[250px] px-[10px] py-[11px] mb-[104px]'}>
              <div className={'text-center'}>
                <p className={'text-[#262A2F] text-[14px] font-bold '}>Keywords</p>
                <p className={'text-[#E71C40] text-[14px] '}>* Min : 3 words, Max : 10 words</p>
              </div>
              {userInput.keywords.length < 10 && <KeywordInput keyword={typedKeyword} setPutKeyword={setTypedKeyword} onEnterKeyDown={onEnterKeyDown} />}
              <SizedBox height={12} />
              <KeywordList keywords={userInput.keywords} onRemoveKeywordButtonClicked={onRemoveKeywordButtonClicked} />
            </div>
            <NextButton onClick={onGoToTextOptional}>Done</NextButton>
          </div>
        </div>
        {isModalOpen && <KeywordModal Title={'You must enter at least 3 keywords!'} SubTitle={'* Number of keywords required : 3 to 10'} setKeywordModalOpen={setModalOpen} />}
      </div>
    </Layout>
  )
}
