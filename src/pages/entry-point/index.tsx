import { useRouter } from 'next/router'
import { AppRoutes } from '@/common/Constants'
import { BasicButton } from '@/components/ui/button/BasicButton'
import React, { ChangeEvent, useState,useRef } from 'react'
import { BasicInput } from '@/components/ui/input/BasicInput'
import { cookieService } from '@/services/CookieService'
import { authService } from '@/services/AuthService'
import Layout from '@/components/layout'
import { NextButton } from '@/components/ui/button/NextButton'
import { BackButton } from '@/components/ui/button/BackButton'

export default function Home() {

const [state, setState] = useState({
    entryPassword: '123456',
  })
  const { entryPassword } = state
  const goToMainPageButtonClicked = async () => {
      const isValidPassword = await authService.validateEntryPointPassword(entryPassword)
    
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
    
      alert('invalid value!')
    }
    
    //위에건 건들지 말기
    
 
    

      const router = useRouter()
      const codeInputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement | null>(null));
      const onInputChanged = (index: number, value: string) => {
        if (index < codeInputRefs.length - 1) {
          codeInputRefs[index + 1].current?.focus();
        }
      };


    
    return (
      
      <Layout>
        <div className={'flex flex-col  justify-front items-front w-full max-w-[428px] h-full pt-9  relative '}>
          <BackButton />
          <div className={'text-center'}>
            <h1 className={'font-bold text-[38px] '}>Hello✨</h1>
            <p className={'text-[16px] mt-5 mb-10'}>
              Type your abraca-code
              <br/>
              to get access to our system
            </p>
            <div className={'w-[90%] h-[128px] bg-[#E0C2CA] rounded-[37px] mx-auto'}>
              <div className={'font-bold text-[14px] pt-[11px] pb-[16px]'}>Magic code</div>
              {codeInputRefs.map((ref, index) => (
                <input
                  ref={ref}
                  key={index}
                  maxLength={1}
                  onChange={(e) => onInputChanged(index, e.target.value)}
                  className={'w-[44px] h-[60px] text-center rounded-[10px] mx-[5px] appearance-none border-2 focus:outline-none focus:bg-white focus:border-[#23C164]'}
                />
              ))}
          
            </div>
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