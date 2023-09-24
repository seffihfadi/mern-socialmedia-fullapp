import TimeAgo from 'react-timeago'
import User from "../userTypes/User"
import { motion } from 'framer-motion'
import LikePost from '../Buttons/LikePost'
import { downloadIMG } from '../../utils/code'
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef, useState, useEffect } from "react"
import { useAuth } from '../../context/AuthProvider'
import { PinAnim } from "../../utils/animation/exploreAnimation"
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'



const Pin = ({pin}) => {

  const swiperRef = useRef()
  const navigate = useNavigate()
  const {_id: sessionID} = useAuth()
  const [autoplayInitiallyActive] = useState(false)
  const toLink = pin.owner._id === sessionID ? `/profile/?post=${pin._id}` : `/?post=${pin._id}`

  pin.likeCount = pin.reactions.length

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
      <div 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        onClick={() => navigate(toLink)} 
        className="hov"
      >
        <div onClick={(e) => e.stopPropagation()}  className="savedown">
          <LikePost pin={pin} />
          <a 
            download
            href={downloadIMG(pin.images[0])} 
          >
            <i className="uil uil-import"></i>
          </a>
          <div className="ml-auto flex items-center gap-3 font-bold">
            {pin.views.length > 0 && <span>{pin.views.length} views</span>}
            {pin.images.length > 1 && <i className="uil uil-layers"></i>}
          </div>
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