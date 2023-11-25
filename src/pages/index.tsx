import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/common/constants'

export default function Home() {
  const router = useRouter()

  const onExampleButtonClicked = () => {
    router.push(AppRoutes.example)
  }

  return (
    <Layout>
      <span>HELLO!</span>
      <button className={'bg-red-200 w-fit p-2'} onClick={onExampleButtonClicked}>
        예제 페이지로 가기
      </button>
    </Layout>
  )
}
