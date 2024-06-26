import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/common/Constants'
import { BasicButton } from '@/components/ui/button'
import React from 'react'

export default function Home() {
  const router = useRouter()

  const onAPiExampleButtonClicked = () => {
    router.push(AppRoutes.apiExample)
  }

  const onPublishExampleButtonClicked = () => {
    router.push(AppRoutes.publishExample)
  }

  const onAtomExampleButtonClicked = () => {
    router.push(AppRoutes.atomExample)
  }
  const onUITextButtonClicked = () => {
    router.push(AppRoutes.inputText)
  }
  const onUIImageButtonClicked = () => {
    router.push(AppRoutes.inputImage)
  }

  return (
    <Layout>
      <div className={'flex flex-col justify-center items-center rounded-[20px] bg-white w-full max-w-[512px] h-full'}>
        <BasicButton onClick={onAPiExampleButtonClicked}>API 통신 예제 페이지로 가기</BasicButton>
        <BasicButton onClick={onPublishExampleButtonClicked}>퍼블리시 예제 페이지로 가기</BasicButton>
        <BasicButton onClick={onAtomExampleButtonClicked}>atom 예제 페이지로 가기</BasicButton>
        <BasicButton onClick={onUITextButtonClicked}>UI text 페이지로 가기</BasicButton>
        <BasicButton onClick={onUIImageButtonClicked}>UI image 페이지로 가기</BasicButton>
      </div>
    </Layout>
  )
}
