import express from 'express'
import { 
  getUser, 
  signinUser, 
  signoutUser, 
  signupUser, 
  getAllUsers,
  getUserByID, 
  updateProfile
} from '../controllers/user.js'

import multer from "multer";
import privat from '../middlewares/auth.js';

const storage = multer.memoryStorage()
const upload = multer({ storage })
  
const userRoutes = express.Router()

userRoutes.post('/signin', signinUser)
userRoutes.post('/signup', upload.single("image"), signupUser)
userRoutes.get('/signout', signoutUser)

userRoutes.get('/getuser', privat, getUser)
userRoutes.get('/getusers', privat, getAllUsers)
userRoutes.get('/:userID', privat, getUserByID)
userRoutes.patch('/update', privat, updateProfile)

export default userRoutes