import { useRouter } from 'next/router'
import { AppRoutes } from '@/common/Constants'
import { BasicButton } from '@/components/ui/button/BasicButton'
import React from 'react'
import ChevronRightAnimated from '@/components/ui/icon/ChevronRightAnimated'
import Layout from '@/components/layout'

export default function Home() {
  const router = useRouter()

  const onAPiExampleButtonClicked = () => {
    router.push(AppRoutes.apiExample)
  }

  const onPublishExampleButtonClicked = () => {
    router.push(AppRoutes.publishExample)
  }

  const onLayoutExampleButtonClicked = () => {
    router.push(AppRoutes.layoutExample)
  }

  const onAtomExampleButtonClicked = () => {
    router.push(AppRoutes.atomExample)
  }
  const onUITextButtonClicked = () => {
    router.push(AppRoutes.inputTextKeyword)
  }
  const onUIImageButtonClicked = () => {
    router.push(AppRoutes.input)
  }

  const onGoToMainPageButtonClicked = () => {
    router.push(AppRoutes.input)
  }

  return (
    <Layout>
      <div className={'flex flex-col justify-center items-center rounded-[20px] bg-white w-full max-w-[512px] h-full gap-2'}>
        <BasicButton onClick={onAPiExampleButtonClicked}>API 통신 예제 페이지로 가기</BasicButton>
        <BasicButton onClick={onPublishExampleButtonClicked}>퍼블리시 예제 페이지로 가기</BasicButton>
        <BasicButton onClick={onLayoutExampleButtonClicked}>레이아웃 예제 페이지로 가기</BasicButton>
        <BasicButton onClick={onAtomExampleButtonClicked}>atom 예제 페이지로 가기</BasicButton>
        <BasicButton onClick={onUIImageButtonClicked}>UI image 페이지로 가기</BasicButton>
        <BasicButton onClick={onUITextButtonClicked}>UI text 페이지로 가기</BasicButton>
        <BasicButton onClick={onGoToMainPageButtonClicked}>메인 페이지로 가기</BasicButton>
      </div>
    </Layout>
  )
}
