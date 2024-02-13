import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { authService } from '@/services/AuthService'
import { printLog } from '@/utils/LogUtil'
import { cookieService } from '@/services/CookieService'
import { postService } from '@/services/PostService'
import Layout from '@/components/layout'
import { BackButtonTwo } from '@/components/ui/button/BackButtonTwo'
import { TitleText } from '@/components/ui/typography/TitleText'
import { ConfirmButton } from '@/components/ui/button/ConfirmButton'

export default function LayoutExample() {
  const router = useRouter()

  const [state, setState] = useState({
    email: 'test@gmail.com',
    password: '1234',
  })

  const { email, password } = state

  // const onLoginButtonClicked = async () => {
  //   const result = await authService.requestLogin(email, password)
  //   const accessToken = result.accessToken ?? ''
  //   const refreshToken = result.refreshToken ?? ''
  //   cookieService.setAccessToken(accessToken)
  //   cookieService.setRefreshToken(refreshToken)
  // }

  const onTokenRefreshButtonClicked = async () => {
    const result = await authService.refreshToken()
    printLog(result)
  }

  const onTestAPICallButtonClicked = async () => {
    const result = await postService.getPost(1)
    printLog(JSON.stringify(result))
  }

  const onValidateTokenButtonClicked = async () => {
    const result = await authService.validateToken()
    printLog(result)
  }

  const onInputChanged = (ev: ChangeEvent<HTMLInputElement>) => {
    const key = ev.target.name
    const value = ev.target.value
    setState({
      ...state,
      [key]: value,
    })
  }

  return (
    <Layout>
      <div className={'flex flex-col w-full min-h-full h-fit bg-blue-300'}>
        <div className={'p-[24px]'}>
          <BackButtonTwo />
        </div>
        <div className={'flex min-h-[300px] justify-center items-center bg-amber-500'}>
          <TitleText>Give me words</TitleText>
        </div>
        <div className={'flex min-h-[300px] justify-center items-center bg-green-300'}>
          <TitleText>Bottom Area</TitleText>
        </div>
        <div className={'flex min-h-[300px] justify-center items-center bg-blue-300'}>
          <TitleText>Bottom Area2</TitleText>
        </div>

        <div className={'p-[24px] bg-emerald-200'}>
          <ConfirmButton>완료</ConfirmButton>
        </div>
      </div>
    </Layout>
  )
}
