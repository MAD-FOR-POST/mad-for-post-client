import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAtom } from '@/stores/UserAtom'
import { BasicButton } from '@/components/ui/button/BasicButton'
import Layout from '@/components/layout'
import { ChangeEvent, useEffect, useState } from 'react'
import { IUser } from '@/interfaces/user/IUser'

export default function TailwindExample() {
  const [userInfo, setUserInfo] = useRecoilState(userAtom)
  const [typedData, setTypedData] = useState<IUser>({
    id: 0,
    email: '',
    nickName: '',
    roles: [],
    createdAt: Date.prototype,
    updatedAt: Date.prototype,
  })

  const { id, nickName, email, roles, createdAt, updatedAt } = typedData
  const router = useRouter()

  // const setTestUserInfo = () => {
  //   setUserInfo({
  //     ...userInfo,
  //   })
  // }

  const onGoToHomeButtonClicked = () => {
    router.back()
  }

  const handleInputChanged = (ev: ChangeEvent<HTMLInputElement>) => {
    const key = ev.target.id
    const value = ev.target.value
    setTypedData({
      ...typedData,
      [key]: value,
    })
  }

  // useEffect(() => {
  //   setTypedData({
  //     id: 0,
  //     nickName: ' ',
  //   })
  // }, [userInfo])

  return (
    <Layout>
      <div className={'flex flex-col justify-center items-center rounded-[20px] bg-white w-full max-w-[512px] h-full'}>
        <BasicButton onClick={onGoToHomeButtonClicked}>홈으로 가기</BasicButton>
        {/*<input id={'email'} placeholder={'email을 입력해주세요'} onChange={handleInputChanged} value={email} />*/}
        {/*<input id={'name'} placeholder={'name을 입력해주세요'} onChange={handleInputChanged} value={name} />*/}
        {/*<BasicButton onClick={setTestUserInfo}>atom에 저장하기</BasicButton>*/}
      </div>
    </Layout>
  )
}
