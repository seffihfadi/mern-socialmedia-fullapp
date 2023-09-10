import { useAlert } from "../context/AlertProvider"
import { motion, AnimatePresence } from 'framer-motion'

const AlertModel = () => {
  const [,alert] = useAlert()
  return (
    <AnimatePresence>
      {alert &&
      <motion.div initial={{x: 500}} animate={{x:0}} exit={{x:500}} className={`alert ${alert.type}`}>
        {alert.type === 'error' ?
          <i className="uil uil-exclamation-octagon"></i>
          : 
          <i className="uil uil-check-circle"></i>
        }
        <p>{alert.text}</p>    
      </motion.div>
      }
    </AnimatePresence>
  )
}

export default AlertModel