import React, { ChangeEvent, KeyboardEvent, ReactNode } from 'react'
import { NextButton } from '../button/NextButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons'



export const CopySuccessModal= () => {
 

  return (
    <div className={'absolute top-3 text-white w-full h-[160px] flex flex-col justify-center items-center  bg-[#303841]/80 rounded-[10px] px-[10px]  backdrop-blur-md'}>
      <h1 className="text-[19px] font-bold"> 텍스트 복사 완료 !</h1>
      <p className="text-[14px]">
        1. 자동 업로드 기능은 개발 중입니다. 
        <br/>
        2. 그때까지 사진 다운로드 및 텍스트 복사 기능으로 게시물을 올릴 수 있습니다. 
        <br/> 
        3. 우측 하단 인스타그램 아이콘을 눌러 즉시 포스팅을 해봅시다!
      </p>
    </div>
  )
}
