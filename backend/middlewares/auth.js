import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const privat = async (req, res, next) => {
  console.log('req.cookies', req.cookie)
  try {
    const token = req.cookies.zoquixToken
    if (!token) {
      res.status(401)
      throw new Error('not authorized, please login')
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    
    if (!verified) {
      res.status(401)
      throw new Error('something went wrong, please login')
    }
    const {userID} = verified
    const user = await User.findById(userID).select('-password')
    if (!user) {
      res.status(401)
      throw new Error('user not found, something went wrong, please login')
    } 
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

export default privat