import React, { ChangeEvent, KeyboardEvent } from "react";

interface KeywordInputProps{
    putKeyword:string;
    setPutKeyword: React.Dispatch<React.SetStateAction<string>>;
    onEnter:()=>void;
}
export const KeywordInput=({putKeyword,setPutKeyword,onEnter}:KeywordInputProps)=>{
    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
          onEnter();
        }
    }
    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setPutKeyword(e.target.value);
    }
    
    return(
        <div className={'h-full'}>
            <input 
                type="text" 
                className={'text-[16px] w-[87%] p-[4px]'} 
                placeholder='Write keywords here.'
                value={putKeyword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button className={'text-[16px] text-[#116AEF]'}>Add</button>
        </div>
    )
}