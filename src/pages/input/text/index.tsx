import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import { useState } from 'react'
import { NextButton } from '@/components/ui/button/NextButton'
import { BackButton } from '@/components/ui/button/BackButton'
import { KeywordInput } from '@/components/ui/keyword/KeywordInput'
import { KeywordList } from '@/components/ui/keyword/KeywordList'
import { printLog } from '@/utils/LogUtil'

export default function TextPage() {
  const [keywords, setKeywords] = useState<string[]>([])
  const [typedKeyword, setTypedKeyword] = useState('')
  const router = useRouter()

  const onEnterKeyDown = () => {
    setKeywords((prevData) => [...prevData, typedKeyword])
    setTypedKeyword('')
  }

  const onRemoveKeywordButtonClicked = (index: number) => {
    setKeywords((prevData) => {
      const newData = [...prevData]
      newData.splice(index, 1)
      return newData
    })
  }
  const onGoToImage = () => {
    router.replace("/input/image")
    // router.push("/image")
  }
  // printLog(putKeyword)
  printLog(keywords)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keywordForm= keywords
    const detail = formData.get("detail") as string;
    console.log('이거 확인해바!!!', keywordForm, detail)
  };

  return (
    <Layout>
      <div className={'flex flex-col justify-between items-center bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9 relative '}>
        <BackButton />
        <br />
        <div className={'relative w-full'}>
          <span className={'text-[#262A2F] text-[38px] font-bold top-[-86px] w-full text-center absolute'}>Give me words</span>
          <form onSubmit={handleSubmit} className={'flex flex-col items-center bg-white/50 w-full rounded-t-[40px] '}>
            <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[134px] mt-[43px] px-[10px] py-[11px] '}>
              <div className={'text-[#262A2F] text-[14px] font-bold text-center  mb-[16px]'}>Keywords</div>
              <KeywordInput keyword={typedKeyword} setPutKeyword={setTypedKeyword} onEnterKeyDown={onEnterKeyDown} />
              <KeywordList keywords={keywords} onRemoveKeywordButtonClicked={onRemoveKeywordButtonClicked} />
            </div>
            <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[194px] mt-[14px] px-[40px] pt-[12px] pb-[24px] mb-[104px]'}>
              <div className={'text-[#262A2F] text-[14px] font-bold text-center  mb-[16px]'}>Any more detail?(optional)</div>
              <textarea
                style={{ resize: 'none' }}
                className={'flex-grow h-full text-[16px] focus:outline-none hide-scrollbar'}
                placeholder="Add more detail about keywords."
                name="detail"
              ></textarea>
            </div>
            <NextButton onClick={onGoToImage}>Done</NextButton>
          </form>
        </div>
      </div>
    </Layout>
  )
}
