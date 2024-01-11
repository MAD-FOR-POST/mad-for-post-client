import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface InterfaceProp {
  link?: string
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CopySuccessModal = ({ link, setModal }: InterfaceProp) => {
  return (
    <div className={' absolute mb-[32px] bottom-0  z-50 text-white w-full h-[160px] flex   justify-center items-center  bg-[#303841]/80 rounded-[10px] backdrop-blur-sm   '}>
      <div
        className=" flex flex-col w-full pl-8 "
        onClick={() => {
          setModal(false)
        }}
      >
        <h1 className="text-[16px] font-bold mb-4 text-center pl-16"> 텍스트 복사 완료 !</h1>
        <p className="text-[14px] w-5/6">
          자동 업로드 기능은 아직 개발 중이에요!
          <br />
          그때까지는 사진을 다운로드하고 텍스트를 복사해서 게시물을 올릴 수 있어요.
          <br />
          한번 포스팅 하러 가 볼까요!
        </p>
      </div>
      <a className="flex w-1/6  items-start justify-center" href={link} target="_blank">
        <FontAwesomeIcon icon={faChevronRight} size="xl" />
      </a>
    </div>
  )
}
