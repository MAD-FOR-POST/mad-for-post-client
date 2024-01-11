// import React, { ChangeEvent, useRef, useEffect,useState } from 'react'
import React, { ChangeEvent, useRef,useEffect, forwardRef, ForwardedRef, useImperativeHandle, useState } from 'react';


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onInputChanged?: (value: string) => void;

}

// export const CodeInput: React.FC<Props> = (props) => {

//   const [code,setCode]=useState('')

//   const onInputChanged = (ev: ChangeEvent<HTMLInputElement>) => {
//     const value = ev.target.value
//     setCode(value)
//   }


//   return (
//     <input
//     value={code}
//     maxLength={1}
//     onChange={onInputChanged}
//     className={'w-[44px] h-[60px] text-center rounded-[10px] mx-[5px] appearance-none border-2 focus:outline-none focus:bg-white focus:border-[#23C164]'}
//       {...props}
//     />
//   )
// }


//되긴하는데 useImperativeHandel에서 오류가 자꾸 뜸.
// export const CodeInput = forwardRef(function CodeInput(
//   props: Props,
//   ref: ForwardedRef<HTMLInputElement>
// ) {
//   const [code, setCode] = useState('');

//   const onInputChanged = (ev: ChangeEvent<HTMLInputElement>) => {
//     const value = ev.target.value;
//     setCode(value);
//     props.onInputChanged && props.onInputChanged(value);
//   };

//  const inputRef = useRef<HTMLInputElement>(null);

//   useImperativeHandle(ref, () => ({
//     focus: () => {
//       inputRef.current?.focus();
//     }
//   }));



//   return (
//     <input
//       ref={inputRef}
//       value={code}
//       maxLength={1}
//       onChange={onInputChanged}
//       className={'w-[44px] h-[60px] text-center rounded-[10px] mx-[5px] appearance-none border-2 focus:outline-none focus:bg-white focus:border-[#23C164]'}
//       {...props}
//     />
//   );
// });

export const CodeInput: React.FC<Props> = ({ onInputChanged, ...props }) => {
  const [code, setCode] = useState('');

  
  const onInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    // setCode(value);
    onInputChanged && onInputChanged(value);

    
    // 추가: 다음 input으로 포커스 이동
  };

  return (
    <input
      // value={code}
      maxLength={1}
      // onChange={onInput}
      className={'w-[44px] h-[60px] text-center rounded-[10px] mx-[5px] appearance-none border-2 focus:outline-none focus:bg-white focus:border-[#23C164]'}
      {...props}
    />
  );
};