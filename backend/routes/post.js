import express from 'express'
import privat from '../middlewares/auth.js'
import { createPost, getFeed } from '../controllers/post.js'

const postRoutes = express.Router()

postRoutes.route('/create').post(privat, createPost)
postRoutes.route('/').get(privat, getFeed)

export default postRoutes