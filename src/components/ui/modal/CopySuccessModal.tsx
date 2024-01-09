import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface InterfaceProp {
  link?: string
}

export const CopySuccessModal = ({ link }: InterfaceProp) => {
  return (
    <div className={'absolute top-3 text-white w-full h-[160px] flex flex-col  justify-center items-center  bg-[#303841]/80 rounded-[10px] px-[10px] backdrop-blur-sm  '}>
      <h1 className="text-[19px] font-bold mb-4"> 텍스트 복사 완료 !</h1>

      <div className=" flex w-full ">
        <p className="text-[14px] w-5/6">
          자동 업로드 기능은 아직 개발 중이에요!
          <br />
          그때까지는 사진을 다운로드하고 텍스트를 복사해서 게시물을 올릴 수 있어요.
          <br />
          한번 포스팅 하러 가 볼까요!
        </p>
        <a className="flex w-1/6  items-start justify-center" href={link}>
          <FontAwesomeIcon icon={faChevronRight} size="xl" />
        </a>
      </div>
    </div>
  )
}
