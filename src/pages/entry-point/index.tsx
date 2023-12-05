import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/common/Constants'
import { BasicButton } from '@/components/ui/button/BasicButton'
import React, { ChangeEvent, useState } from 'react'
import ChevronRightAnimated from '@/components/ui/icon/ChevronRightAnimated'
import { BasicInput } from '@/components/ui/input/BasicInput'
import { cookieService } from '@/services/CookieService'

export default function Home() {
  const router = useRouter()
  const [state, setState] = useState({
    entryPassword: '1234',
  })

  const { entryPassword } = state
  const onInputChanged = (ev: ChangeEvent<HTMLInputElement>) => {
    const key = ev.target.name
    const value = ev.target.value
    setState({
      ...state,
      [key]: value,
    })
  }

  const goToMainPageButtonClicked = () => {
    //TODO: - API로 변경
    if (entryPassword === '1234') {
      cookieService.setAccessToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoxOSwicm9sZXMiOlsiVXNlciJdLCJpYXQiOjE3MDE3ODQ2MTUsImV4cCI6MTcwMTc5NTQxNX0.YkyGfJm-02SMjAja5VE5UpoXZHIf-56mjHj0y3F6OZ8',
      )
      cookieService.setRefreshToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoxOSwicm9sZXMiOlsiVXNlciJdLCJpYXQiOjE3MDE3ODQ2MTUsImV4cCI6MTcwMTc4NDYxNX0.d2xRHNaZhgO-eqh74eR7MCtwTcWVhrTKRLcgFGlzcf8',
      )
      router.push(AppRoutes.input)
      return
    }

    alert('invalid value!')
  }

  return (
    <div className={'w-screen h-screen flex flex-col items-center justify-center bg-blue-200'}>
      <div className={'flex flex-col items-start p-[24px] bg-white gap-4 rounded'}>
        <span className={'text-lg'}>Type Hash Code</span>
        <div className={'flex gap-4'}>
          <BasicInput name={'entryPassword'} value={entryPassword} placeholder={'1234'} onChange={onInputChanged} />
          <BasicButton onClick={goToMainPageButtonClicked}>Enter</BasicButton>
        </div>
      </div>
    </div>
  )
}
