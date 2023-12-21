import React, { ChangeEvent, KeyboardEvent, ReactNode } from 'react'

interface KeywordModalProps {
  Title?: string 
  SubTitle?:string
  setKeywordModalOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export const KeywordModal: React.FC<KeywordModalProps> = ({ Title, SubTitle ,setKeywordModalOpen}) => {
    const handleOkClick = () => {
        setKeywordModalOpen(false);
      };
    return (
        <div className={'absolute top-0 w-full h-full flex justify-center items-center backdrop-blur-md'}>
            <div className={'blur-none w-[90%] h-64 bg-[#FFC4C4] text-center flex flex-col justify-center rounded-[36px]'}>
                <div className={'text-[20px] font-bold w-[60%] mx-auto'}>{Title}</div>
                <div className={'text-[15px] mt-7'}>{SubTitle}</div>
                <button type="button" className={'w-[70%] bg-[#ffffff] mx-auto h-12 rounded-[40px] mt-7 text-[20px] font-bold'} onClick={handleOkClick}>
                    OK
                </button>
            </div>
       </div>
        )
  }
  