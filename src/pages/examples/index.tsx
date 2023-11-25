import { useRouter } from 'next/router'
import Layout from '@/components/layout'

export default function Example() {
  const router = useRouter()
  const goToHomeButtonClicked = () => {
    router.back()
  }

  return (
    <Layout>
      <span>HELLO!</span>

      <button className={'bg-red-200 w-fit p-2'} onClick={goToHomeButtonClicked}>
        홈으로 가기
      </button>
    </Layout>
  )
}
