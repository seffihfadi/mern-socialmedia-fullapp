import { useEffect, useState } from 'react'
import axios from 'axios'
import Empty from '../Empty'
import Loader from '../Loader'
import Pin from './Pin'
import { useSearchParams } from 'react-router-dom'
import { PinsAnim } from '../../utils/animation/exploreAnimation'
import { motion } from 'framer-motion'


const Pins = () => {
  const [explore, setExplore] = useState(null)
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") || ''

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/api/post/explore?searchQuery=${searchQuery}`, 
          {withCredentials: true}
        )
        //console.log('response', response)
        setExplore(response.data)
      } catch (error) {
        console.log('error', error)
      }
    })()
  }, [searchQuery])


  if (!explore) return <Loader msg='Updating' />
  if (explore.length < 1) return <Empty icon="images" text="Unlock a world of possibilities: Uncover hidden gems and forge meaningful connections today!" type="lg" />
  return (
    <motion.div variants={PinsAnim} initial="hidden" animate="show" className="pins">
      {explore.map((pin) => <Pin key={pin._id} pin={pin} />)}
    </motion.div>
  )
}

export default Pins