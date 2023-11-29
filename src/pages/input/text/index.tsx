import { useRouter } from 'next/router'
import { BasicButton } from '@/components/ui/button'
import Layout from '@/components/layout'
import { KeywordInput } from '@/pages/input/text/keywordInput'
import { KeywordList } from '@/pages/input/text/keywordList'
import { useState } from 'react'
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
      <div className={'flex flex-col justify-center items-center rounded-[20px] bg-[#DDBCC5] w-full max-w-[512px] h-full'}>
        <span className={'text-[#262A2F] text-[38px] font-bold mb-[43px]'}>Give me words</span>
        <div className={'flex flex-col items-center bg-white/50 w-full min-h-[543px] rounded-[40px]'}>
          <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[134px] mt-[43px] px-[10px] py-[11px] '}>
            <div className={'flex-1 text-[#262A2F] text-[14px] font-bold text-center  mb-[16px]'}>Keywords</div>
            <KeywordInput 
              putKeyword={putKeyword}
              setPutKeyword={setPutKeyword}
              onEnter={handleEnter}  
            />
            <KeywordList keyword={keyword} removeItem={removeItem}/>
          </div>
          <div className={'flex flex-col bg-white rounded-[36.38px] w-[87%] min-h-[194px] mt-[14px] px-[10px] py-[11px] '}>
            <div className={'flex-1 text-[#262A2F] text-[14px] font-bold text-center  mb-[16px]'}>Any more detail?(optional)</div>
            <textarea className={'h-full text-[16px] '} placeholder='Add more detail about keywords.'></textarea>
          </div>


        </div>
      </div>
    </Layout>
  )
}
