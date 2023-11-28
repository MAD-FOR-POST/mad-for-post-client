import { useRouter } from 'next/router'
import { BasicButton } from '@/components/ui/button'
import Layout from '@/components/layout'

export default function TailwindExample() {
  const router = useRouter()
  const onGoToHomeButtonClicked = () => {
    router.back()
  }

  return (
    <Layout>
      <div className={'flex flex-col justify-center items-center rounded-[20px] bg-white w-full max-w-[512px] h-full'}>
        <BasicButton onClick={onGoToHomeButtonClicked}>홈으로 가기</BasicButton>

        {/*  FLEX ROW */}
        <div className={'flex'}>
          <span>ITEM1</span> <span>ITEM2</span>
        </div>

        {/*  FLEX COLUMN */}
        <div className={'flex flex-col'}>
          <span>ROW1</span> <span>ROW2</span>
        </div>

        {/* SET BACKGROUND COLOR */}
        <div className={'bg-red-200'}>
          <span>RED BACKGROUND</span>
        </div>

        {/* SET TEXT COLOR */}
        <div className={'text-red-500'}>
          <span>RED TEXT</span>
        </div>

        {/* SET TEXT SIZE */}
        <div className={'text-xl'}>
          <span>XL TEXT</span>
        </div>

        {/* SET PADDING */}
        <div className={'p-4 bg-blue-200'}>
          <span>패딩입니다.</span>
        </div>

        {/* SET SIZE */}
        {/*  w-fit : width를 콘텐츠 사이즈만큼만 */}
        {/*  w-full : width를 부모 width의 100%만큼 */}
        {/*  w-screen: width를 화면 사이즈만큼 100vw */}
        {/*  w-[16px] : width를 px 사이즈만큼*/}
        {/*  h-fit : 높이를 ... 변경 */}
        <div className={'w-fit h-fit bg-red-200'}>
          <span>SIZED</span>
        </div>

        {/* SET CORNER RADIUS */}
        <div className={'w-fit rounded-xl p-2 bg-blue-300'}>
          <span>CORNER RADIUS</span>
        </div>

        {/* SET SHADOW */}
        <div className={'w-fit p-2 shadow-blue-200 shadow-xl'}>
          <span>SHADOW</span>
        </div>

        {/* SET HOVER */}
        <div className={'w-fit p-2 bg-red-300 hover:bg-blue-300'}>
          <span>HOVER</span>
        </div>

        {/* CURSOR POINTER */}
        <div className={'w-fit p-2 bg-red-300 hover:bg-blue-300 cursor-pointer'}>
          <span>CURSOR POINTER</span>
        </div>
      </div>
    </Layout>
  )
}
