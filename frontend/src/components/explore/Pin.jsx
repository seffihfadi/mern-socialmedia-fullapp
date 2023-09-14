import User from "../userTypes/User"
import TimeAgo from 'react-timeago'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { EffectFade } from 'swiper/modules'
import { Autoplay } from "swiper/modules"
import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { PinAnim } from "../../utils/animation/exploreAnimation"
import { useRef, useState, useEffect } from "react"

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'



const Pin = ({pin}) => {

  const navigate = useNavigate()
  const swiperRef = useRef()
  const [autoplayInitiallyActive] = useState(false)

  useEffect(() => {
    if (swiperRef.current && !autoplayInitiallyActive) {
      swiperRef.current.swiper.autoplay.stop()
    }
  }, [autoplayInitiallyActive])

  const handleMouseEnter = () => {
    if (swiperRef.current && !swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.start()
    }
  }

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }

  return (
    <motion.div variants={PinAnim} className='pin'>
      <div  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => navigate(`/profile/?post=${pin._id}`)} className="hov">
        <div className="savedown">
          <button onClick={(e) => {e.stopPropagation()}} ><i className="uil uil-heart"></i></button>
          <a 
            onClick={(e) => {e.stopPropagation()}} 
            href={`${pin.images[0]}?dl=`} 
            download 
          >
            <i className="uil uil-import"></i>
          </a>
          {pin.images.length > 1 && <i className="uil uil-layers ml-auto"></i>}
        </div>
        <User user={pin.owner} span={<TimeAgo date={pin.createdAt} />} />
      </div>
      <Swiper
        ref={swiperRef}
        modules={[Pagination, EffectFade, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        autoHeight
        effect="fade"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
      >
      {pin.images.map((img, i) => 
        <SwiperSlide key={i}>
          <img src={img} alt="img" />
        </SwiperSlide>
      )}
      </Swiper>
    </motion.div>
  )
}

export default Pin