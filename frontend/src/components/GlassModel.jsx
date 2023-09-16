import { motion, AnimatePresence} from 'framer-motion'
import Search from './views/Search'
import Notifications from './views/Notifications'

const GlassModel = ({ displayed, type, setDisplayModel }) => {
  return (
    <AnimatePresence>
      {displayed && 
      <motion.div 
        initial={{x: -400}} 
        animate={{x:0}} 
        exit={{x: -400}} 
        className='glassmodel'
        onClick={() => {setDisplayModel(false)}}
      >
        { type === 'search' ? <Search /> : <Notifications /> }
      </motion.div>
      }
    </AnimatePresence>
  )
}

export default GlassModel