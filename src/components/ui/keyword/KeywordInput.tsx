import React, { ChangeEvent, KeyboardEvent, useRef } from 'react'

interface KeywordInputProps {
  keyword: string
  setPutKeyword: React.Dispatch<React.SetStateAction<string>>
  onEnterKeyDown: () => void
}

export const KeywordInput = ({ keyword, setPutKeyword, onEnterKeyDown }: KeywordInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && keyword.trim() !== '') {
      e.preventDefault()
      onEnterKeyDown()
    }
  }

  function onInputChanged(e: ChangeEvent<HTMLInputElement>) {
    setPutKeyword(e.target.value)
  }

  function handleButtonClick() {
    if (keyword.trim() !== '') {
      onEnterKeyDown()
      inputRef?.current?.focus()
    }
  }

  return (
    <div className={'h-full w-full flex px-[24px] '}>
      <input
        type="text"
        required
        ref={inputRef}
        className={'text-[16px] focus:outline-none flex-1'}
        placeholder="Write keywords here."
        value={keyword}
        onChange={onInputChanged}
        onKeyDown={onKeyDown}
      />
      <button className={'text-[16px] text-[#116AEF] ml-[2px]'} onClick={handleButtonClick}>
        Add
      </button>
    </div>
  )
}
