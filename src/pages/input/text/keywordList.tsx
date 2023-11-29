import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
interface KeywordListProps {
    keyword:string[];
    removeItem? : (index:number)=>void;
}
export const KeywordList=({keyword,removeItem=()=>{return;}}:KeywordListProps)=>{
    return(
        <div className={'w-full p-[4px]'}>
            <ul className={'flex flex-row flex-wrap justify-start text-[16px] '}>
                {keyword.map((item,index)=>(
                    <li key={index} className={'relative bg-[#D9D9D9] pl-[22px] pr-[31px] rounded-[14px] mx-[5px] my-[3px]'}>
                        {item}
                        {/* <FontAwesomeIcon icon={faCircleXmark} className={'cursor-pointer absolute right-[10px] top-[4px]'} onClick={()=>removeItem(index)}/> */}
                        <svg className={'cursor-pointer absolute right-[10px] top-[4px]'} onClick={()=>removeItem(index)} xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                    </li>
                ))}
            </ul>
        </div>

    )
}