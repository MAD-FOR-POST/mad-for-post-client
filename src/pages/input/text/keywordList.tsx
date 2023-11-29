interface KeywordListProps {
    keyword:string[];
    removeItem? : (index:number)=>void;
}
export const KeywordList=({keyword,removeItem=()=>{return;}}:KeywordListProps)=>{
    return(
        <div className={'w-full bg-red-300 p-[4px]'}>
            <ul className={'flex text-[16px] '}>
                {keyword.map((item,index)=>(
                    
                    <li key={index} className={'bg-[#D9D9D9] pl-[22px] pr-[31px] rounded-[14px] mx-[10px]'}>
                        {item}
                        <button className={'bg-white rounded-[100%] p-[5px]'}>x</button>
                    </li>
                    
                ))}
            </ul>
        </div>

    )
}