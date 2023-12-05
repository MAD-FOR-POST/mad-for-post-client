import { useRouter } from 'next/router'
import { BasicButton } from '@/components/ui/button/BasicButton'
import Layout from '@/components/layout'
import { BackButton } from '@/components/ui/button/BackButton'
import { ChangeEvent, useState } from 'react'
import { authService } from '@/services/AuthService'
import { printLog } from '@/utils/LogUtil'
import { cookieService } from '@/services/CookieService'
import { BasicInput } from '@/components/ui/input/BasicInput'
import { postService } from '@/services/PostService'

export default function TailwindExample() {
  const router = useRouter()

  const [state, setState] = useState({
    email: 'test@gmail.com',
    password: '1234',
  })

  const { email, password } = state

  const onLoginButtonClicked = async () => {
    const result = await authService.requestLogin(email, password)
    const accessToken = result.access_token ?? ''
    const refreshToken = result.refresh_token ?? ''
    cookieService.setAccessToken(accessToken)
    cookieService.setRefreshToken(refreshToken)
  }

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
    <div className={'flex flex-col gap-2 p-4'}>
      <span>로그인 테스트</span>
      <BasicInput name={'email'} value={email} placeholder={'이메일'} onChange={onInputChanged} />
      <BasicInput name={'password'} value={password} placeholder={'비밀번호'} onChange={onInputChanged} />
      <BasicButton onClick={onLoginButtonClicked}>로그인</BasicButton>
      <BasicButton onClick={onTokenRefreshButtonClicked}>토큰 리프레시</BasicButton>
      <BasicButton onClick={onValidateTokenButtonClicked}>토큰 검증</BasicButton>
      <BasicButton onClick={onTestAPICallButtonClicked}>API 호출</BasicButton>
    </div>
  )
}
