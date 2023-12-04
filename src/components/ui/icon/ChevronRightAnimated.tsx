import React, { useEffect, useState } from 'react'
import styles from './ChevronRightAnimated.module.css'

const ChevronRightAnimated: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = ['images/svg/ic_chevron_right_anim_1.svg', 'images/svg/ic_chevron_right_anim_2.svg', 'images/svg/ic_chevron_right_anim_3.svg']

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 1000) // 1초 간격

    return () => clearInterval(intervalId) // 컴포넌트 언마운트 시 인터벌 제거
  }, [images.length])

  return (
    <div className={styles.animationContainer}>
      {images.map((image, index) => (
        <img draggable="false" width={8.59} key={index} src={image} alt={`Chevron Right ${index + 1}`} className={`${styles.animatedImg} ${styles[`img${index}`]}`} />
      ))}
    </div>
  )
}

export default ChevronRightAnimated
