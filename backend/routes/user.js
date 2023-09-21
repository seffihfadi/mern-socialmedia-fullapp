import express from 'express'
import { 
  getUser, 
  signupUser, 
  signinUser, 
  signoutUser, 
  getAllUsers,
  getUserByID, 
  updateProfile,
  changePassword,
  getSeggestions,
  getProfileViews
} from '../controllers/user.js'

import multer from "multer";
import privat from '../middlewares/auth.js';

const storage = multer.memoryStorage()
const upload = multer({ storage })
  
const userRoutes = express.Router()

userRoutes.post('/signin', signinUser)
userRoutes.post('/signup', upload.single("image"), signupUser)

userRoutes.patch('/update', privat, updateProfile)
userRoutes.patch('/change-password', privat, changePassword)

userRoutes.get('/views', privat, getProfileViews)
userRoutes.get('/signout', signoutUser)
userRoutes.get('/getuser', privat, getUser)
userRoutes.get('/getusers', privat, getAllUsers)
userRoutes.get('/getsegg', privat, getSeggestions)
userRoutes.get('/:userID', privat, getUserByID)

export default userRoutes