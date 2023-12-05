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
      cookieService.setAccessToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? 'testAccessToken')
      cookieService.setRefreshToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? 'testRefresh Token')
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
