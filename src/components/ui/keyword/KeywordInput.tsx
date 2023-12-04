import React, { ChangeEvent, KeyboardEvent } from 'react'

interface KeywordInputProps {
  keyword: string
  setPutKeyword: React.Dispatch<React.SetStateAction<string>>
  onEnterKeyDown: () => void
}

export const KeywordInput = ({ keyword, setPutKeyword, onEnterKeyDown }: KeywordInputProps) => {
  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onEnterKeyDown()
    }
  }

  function onInputChanged(e: ChangeEvent<HTMLInputElement>) {
    setPutKeyword(e.target.value)
  }

  function handleButtonClick() {
    onEnterKeyDown()
  }

  return (
    <div className={'h-full px-[40px]'}>
      <input type="text" className={'text-[16px] w-[92%] focus:outline-none'} placeholder="Write keywords here." value={keyword} onChange={onInputChanged} onKeyDown={onKeyDown} />
      <button className={'text-[16px] text-[#116AEF] ml-[2px]'} onClick={handleButtonClick}>
        Add
      </button>
    </div>
  )
}
