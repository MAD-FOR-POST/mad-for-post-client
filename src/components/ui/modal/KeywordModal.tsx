import React, { ChangeEvent, KeyboardEvent, ReactNode } from 'react'
import { NextButton } from '../button/NextButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons'

interface KeywordModalProps {
  setKeywordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const KeywordModal: React.FC<KeywordModalProps> = ({ setKeywordModalOpen }) => {
  const onOkClick = () => {
    setKeywordModalOpen(false)
  }
  return (
    <div className={'absolute top-0 w-full h-full flex justify-center items-center backdrop-blur-md'}>
      <div className={'blur-none w-[95%] gap-4 border bg-white text-center flex flex-col justify-center rounded-[36px] p-5'}>
        <div className="flex justify-between items-center border-b-2 pb-2">
          <div>
            <FontAwesomeIcon icon={faCircleExclamation} />
            <span className="ml-2">Help</span>
          </div>
          <div onClick={onOkClick}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="border-b-2 pb-2">
          <div className={'text-[14px] mb-5'}>1. Drag the ai-generated image and place it on the stage below! Posts are generated in the order of the images that are staged.</div>
          <div className={'text-[14px]'}>2. Pressing the regenerate button will create 10 new images in 9 seconds, and the images on the stage will not disappear.</div>
        </div>
        <div className="flex justify-center items-center text-white py-5 px-7  rounded-full  bottom-5 text-xl font-bold max-w-[380px] w-custom bg-[#303841] hover:shadow-xl transition-shadow">
          Join us now!
        </div>
      </div>
    </div>
  )
}
