import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

interface KeywordListProps {
  keywords: string[]
  onRemoveKeywordButtonClicked?: (index: number) => void
}

const fadeAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const KeywordList = ({ keywords, onRemoveKeywordButtonClicked }: KeywordListProps) => {
  return (
    <div className={'w-full p-[4px] mx-[16px]'}>
      <div className={'flex flex-row flex-wrap justify-start text-[16px] gap-[10px]'}>
        {keywords.map((keyword, index) => (
          <motion.div
            className={'bg-[#D9D9D9] rounded-[14px] min-w-[60px] min-h-[24px] flex items-center pl-[12px] pr-[8px]'}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeAnimation}
            transition={{ duration: 0.5 }}
            key={index}
            onClick={() => onRemoveKeywordButtonClicked && onRemoveKeywordButtonClicked(index)}
          >
            <div className={'flex justify-center flex-1 mr-[6px]'}>
              <span>{keyword}</span>
            </div>
            <img src={'/images/ic_remove_keyword.png'} width={16} height={16} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
