import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface InterfaceProp {
  link?: string
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CopySuccessModal = ({ link, setModal }: InterfaceProp) => {
  return (
    <div className="px-4 w-full absolute bottom-0 z-50">
      <div className={' p-4 mb-[32px]    text-white  h-[160px] w-full  flex   justify-center items-center  bg-[#303841]/80 rounded-[10px] backdrop-blur-sm   '}>
        <div
          className=" flex flex-col h-full w-full pl-8 items-center  justify-around"
          onClick={() => {
            setModal(false)
          }}
        >
          <h1 className=" text-[16px] font-bold text-center pl-4"> 텍스트 복사 완료 !</h1>
          <p className="text-[14px] ">
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
    </div>
  )
}
