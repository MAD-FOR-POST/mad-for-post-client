import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import { useState,useEffect } from 'react'
import { NextButton } from '@/components/ui/button/NextButton'
import { BackButton } from '@/components/ui/button/BackButton'
import { KeywordInput } from '@/components/ui/keyword/KeywordInput'
import { KeywordList } from '@/components/ui/keyword/KeywordList'
import { printLog } from '@/utils/LogUtil'
import { AppRoutes } from '@/common/Constants'
import { useRecoilState } from 'recoil'
import { userInputTexts } from '@/stores/UserAtom'

export default function TextPage() {
  const [typedKeyword, setTypedKeyword] = useState('')    //리스트 안에 각각
  const router = useRouter()
  const [textareaValue, setTextareaValue] = useState('');
  //recoil 써서 keyword와 detail값 넣기
  const [userInput,setUserInput]=useRecoilState(userInputTexts)

  const onEnterKeyDown = () => {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        keyword: [...prevUserInput.keyword, typedKeyword],
      };
    });

    setTypedKeyword('')
  }

  const onRemoveKeywordButtonClicked = (index: number) => {
    setUserInput((prevUserInput) => {
      const newKeywords = [...prevUserInput.keyword];
      newKeywords.splice(index, 1);
  
      return {
        ...prevUserInput,
        keyword: newKeywords,
      };
    });
  }
  const onGoToImage = () => {
    router.push(AppRoutes.inputImage)
  }
  // printLog(keywords)

  //keyword에 텍스트적혀있으면 handleSubmit이 적용되고 아니면 아예 handleSubmit 작동이 안되는데 이유 모름
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keywordForm= userInput.keyword
    const detail = formData.get("detail") as string;
    console.log('이거 확인해바!!!', keywordForm, detail)
    setUserInput({
      ...userInput,
      keyword:keywordForm,
      detail: detail
    })

  };

  const handleTextareaChange=(e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    const newDetail=e.target.value;
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      detail: newDetail,
    }));
    setTextareaValue(newDetail);
  }

  useEffect(() => {
    console.log('리코일되나확인useEffect로', userInput);
  }, [userInput]);

  return (
    <Layout>
      <div className={'flex flex-col justify-between items-center bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9 relative '}>
        <BackButton />
        <br />
        <div className={'relative w-full'}>
          <span className={'text-[#262A2F] text-[38px] font-bold top-[-86px] w-full text-center absolute'}>Give me words</span>
          <form 
            onSubmit={handleSubmit} 
            style={{
              backgroundImage: 'url("/images/FormBackgroundLong.png")',
              backgroundSize: '110%',
              backgroundPosition: 'top',
              transform: 'scale(1.0)',
            }}
            className={'flex flex-col items-center  w-full'}>
            <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[134px] mt-[63px] px-[10px] py-[11px]'}>
              <div className={'text-[#262A2F] text-[14px] font-bold text-center  mb-[16px]'}>Keywords</div>
              <KeywordInput keyword={typedKeyword} setPutKeyword={setTypedKeyword} onEnterKeyDown={onEnterKeyDown} />
              <KeywordList keywords={userInput.keyword} onRemoveKeywordButtonClicked={onRemoveKeywordButtonClicked} />
            </div>
            <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[194px] mt-[14px] px-[40px] pt-[12px] pb-[24px] mb-[104px]'}>
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
          </form>
        </div>
      </div>
    </Layout>
  )
}
