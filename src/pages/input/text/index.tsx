import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import { KeywordInput } from '@/pages/input/text/keywordInput'
import { KeywordList } from '@/pages/input/text/keywordList'
import { useState } from 'react'
import { NextButton } from '@/components/ui/button/NextButton'
import { BackButton } from '@/components/ui/button/BackButton'
export default function TextPage() {
  const [keyword,setKeyword]=useState<string[]>([])
  const [putKeyword,setPutKeyword]=useState("")

  const handleEnter=()=>{
    setKeyword((prevData)=>[...prevData,putKeyword])
    setPutKeyword("")
  }

  const removeItem=(index:number)=>{
    setKeyword((prevData)=>{
      const newData=[...prevData];
      newData.splice(index,1);
      return newData;
    })
  }
  // console.log(putKeyword)
  console.log(keyword)
  return (
    <Layout>
      <div className={'flex flex-col justify-between items-center rounded-[20px] bg-[#DDBCC5] w-full max-w-[512px] h-full pt-9 relative '}>
        <BackButton/>
        <br/>
        <div className={'relative w-full'}>

          <span className={'text-[#262A2F] text-[38px] font-bold top-[-86px] w-full text-center absolute'}>Give me words</span>
          <div className={'flex flex-col items-center bg-white/50 w-full rounded-t-[40px] rounded-b-[20px] '}> 
            <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[134px] mt-[43px] px-[10px] py-[11px] '}>
              <div className={'text-[#262A2F] text-[14px] font-bold text-center  mb-[16px]'}>Keywords</div>
              <KeywordInput 
                putKeyword={putKeyword}
                setPutKeyword={setPutKeyword}
                onEnter={handleEnter}  
                />
              <KeywordList keyword={keyword} removeItem={removeItem}/>
            </div>
            <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[194px] mt-[14px] px-[10px] py-[11px] mb-[104px]'}>
              <div className={'text-[#262A2F] text-[14px] font-bold text-center  mb-[16px]'}>Any more detail?(optional)</div>
              <textarea className={'flex-grow h-full text-[16px] focus:outline-none'} placeholder='Add more detail about keywords.'></textarea>
            </div>
            <NextButton>Done</NextButton>

          </div>
        </div>
           
      </div>
    </Layout>
  )
}
