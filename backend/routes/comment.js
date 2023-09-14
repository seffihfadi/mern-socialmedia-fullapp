import express from 'express'
import privat from '../middlewares/auth.js'
import { createComment, getComments, getReplays, deleteComment } from '../controllers/comment.js'

const commentRoutes = express.Router()

commentRoutes.route('/create').post(privat, createComment)
commentRoutes.route('/:postID').get(privat, getComments)
commentRoutes.route('/:commentID/replays').get(privat, getReplays)
commentRoutes.route('/:commentID/delete').get(privat, deleteComment)

export default commentRoutes