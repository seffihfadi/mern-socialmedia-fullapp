import express from 'express'
import privat from '../middlewares/auth.js'
import { 
  createPost, 
  getFeed, 
  likePost, 
  getPost, 
  updatePost, 
  deletePost, 
  getExplore, 
  getTags, 
  getUserPosts,
  incPostViews
} from '../controllers/post.js'

const postRoutes = express.Router()

postRoutes.route('/').get(privat, getFeed)
postRoutes.route('/create').post(privat, createPost)
postRoutes.route('/explore').get(privat, getExplore)
postRoutes.route('/tags').get(privat, getTags)
postRoutes.route('/:postID').get(privat, getPost)
postRoutes.route('/:postID').delete(privat, deletePost)
postRoutes.route('/:postID/reaction').patch(privat, likePost)
postRoutes.route('/:postID/update').patch(privat, updatePost)
postRoutes.route('/:postID/inc-views').patch(privat, incPostViews)
postRoutes.route('/:userID/posts').get(privat, getUserPosts)

export default postRoutes