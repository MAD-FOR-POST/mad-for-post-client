import { useRouter } from 'next/router'
import { AppRoutes } from '@/common/Constants'
import { BasicButton } from '@/components/ui/button/BasicButton'
import React, { useState,useRef,useEffect } from 'react'
import { BasicInput } from '@/components/ui/input/BasicInput'
import { cookieService } from '@/services/CookieService'
import { authService } from '@/services/AuthService'
import Layout from '@/components/layout'
import { NextButton } from '@/components/ui/button/NextButton'
import { BackButton } from '@/components/ui/button/BackButton'

export default function Home() {

  const [invalidValue, setInvalidValue] = useState(true); //코드가 제대로 유무에 따라 스타일다르게 
  useEffect(() => {
    if (!invalidValue) {
      // setCode([...Array(codeInputRefs.length).fill('')]);
      codeInputRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.value = '';
        }
      });
    }
  }, [invalidValue]);
  
  const goToMainPageButtonClicked = async () => {
      const fullCode=code.join('')
      console.log('제출할 코드 번호:', fullCode,typeof(fullCode));

      const isValidPassword = await authService.validateEntryPointPassword(fullCode)
    
      //TODO: - API로 변경
      if (isValidPassword) {
          cookieService.setAccessToken(
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGZvcnBvc3RAZ21haWwuY29tIiwic3ViIjoxNiwicm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNzAxOTUxNTEwLCJleHAiOjIwMTc1Mjc1MTB9.HEAedxVWiwdb4jRlq4J--VelnPSjWFQ1OJY0Td0aUPM',
      )
      cookieService.setRefreshToken(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoxOSwicm9sZXMiOlsiVXNlciJdLCJpYXQiOjE3MDE3ODQ2MTUsImV4cCI6MTcwMTc4NDYxNX0.d2xRHNaZhgO-eqh74eR7MCtwTcWVhrTKRLcgFGlzcf8',
        )
        router.push(AppRoutes.input)
        return
      }
    
      // alert('invalid value!')
      //유효 안한경우 
      setInvalidValue(false);
    }

      const router = useRouter()
      
      const codeInputRefs = [useRef<HTMLInputElement | null>(null),useRef<HTMLInputElement | null>(null),useRef<HTMLInputElement | null>(null),useRef<HTMLInputElement | null>(null),useRef<HTMLInputElement | null>(null),useRef<HTMLInputElement | null>(null)];
      // const codeInputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement | null>(null));
      
      //코드입력 내용
      const [code, setCode] = useState<string[]>(Array(codeInputRefs.length).fill(''));
      const onInputChanged = (index: number, value: string ) => {

        const newCode=[...code]
        newCode[index]=value;
        setCode(newCode);

          if (value === '' && index > 0) {
            codeInputRefs[index].current?.focus();
          } else if (index < codeInputRefs.length - 1) {
            codeInputRefs[index + 1].current?.focus();
          }
      }
        const handleArrowKey=(index:number,arrow:'left'|'right')=>{
          if (arrow==='left' && index>0){
            codeInputRefs[index-1].current?.focus();
          }
        else if(arrow=='right' && index < codeInputRefs.length - 1 ){
          codeInputRefs[index+1].current?.focus();
        }
      }

    
    return (
      
      <Layout>
        <div className={'flex flex-col items-center w-full max-w-[428px] h-full pt-9 relative '}>
          <BackButton />
          <div className={'text-center w-full flex justify-center  flex-col h-[85%]'}>
            <h1 className={'font-bold text-[38px] '}>Hello✨</h1>
            <p className={'text-[16px] mt-5 mb-6'}>
              Type your abraca-code
              <br/>
              to get access to our system
            </p>
            {invalidValue?(
              <div className={'h-[150px]'}>
              <div className={'w-[90%] h-[128px] bg-[#E0C2CA] rounded-[37px] mx-auto '}>
                <div className={'font-bold text-[14px] pt-[11px] pb-[16px]'}>Magic code</div>
                {codeInputRefs.map((ref, index) => (
                  <input
                    ref={ref}
                    key={index}
                    maxLength={1}
                    onChange={(e) => onInputChanged(index, e.target.value)}
                    onKeyDown={(e)=>{
                      if(e.key==='ArrowLeft'){
                        e.preventDefault();
                        handleArrowKey(index,'left')
                      }
                      else if(e.key==='ArrowRight'){
                        e.preventDefault();
                        handleArrowKey(index,'right')
                      }
                    }}
                    className={'w-[44px] h-[60px] text-center rounded-[10px] mx-[5px] border-[1px] border-[#ffffff] appearance-none border-2 focus:outline-none focus:bg-white focus:border-[#23C164]'}
                    />
                    ))}
              </div>
                    </div>
            ):(
              //잘못입력한 경우
              <div className={'h-[150px]'}>
              <div className={'w-[90%] h-[148px] bg-[#E0C2CA] rounded-[37px] mx-auto'}>
              <div className={'font-bold text-[14px] pt-[11px] pb-[16px]'}>Magic code</div>
              {codeInputRefs.map((ref, index) => (
                <input
                  ref={ref}
                  key={index}
                  maxLength={1}
                  onChange={(e) => onInputChanged(index, e.target.value)}
                  onKeyDown={(e)=>{
                    if(e.key==='ArrowLeft'){
                      e.preventDefault();
                      handleArrowKey(index,'left')
                    }
                    else if(e.key==='ArrowRight'){
                      e.preventDefault();
                      handleArrowKey(index,'right')
                    }
                  }}
                  onFocus={() => {
                    setInvalidValue(true);
                  }}
                  className={'border-[#E71C40] w-[44px] h-[60px] text-center rounded-[10px] mx-[5px] border-[1px]  appearance-none  '}
                />
              ))}
              <div className={'text-[#E71C40] text-[14px] mt-[10px]'}>Invalid code. Please check and try again.</div>
            </div>
            </div>
            )}
            <p className={'text-[16px] mt-5 '}>
              You don&apos;t have a code,
              <br/> 
              please contact use here
            </p>
          </div>
        
        
          <NextButton onClick={goToMainPageButtonClicked}>Done</NextButton>
        
          
        </div>
      </Layout>
    )
  }