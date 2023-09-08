import express from 'express'
import { 
  getUser, 
  signinUser, 
  signoutUser, 
  signupUser, 
  getAllUsers 
} from '../controllers/user.js'
//import imageUpload from '../middlewares/imageUpload.js'

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

export default userRoutes