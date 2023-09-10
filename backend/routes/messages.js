import express from 'express'
import privat from '../middlewares/auth.js'
import { getRoomMessages, insertMessage } from '../controllers/messages.js'

const messagesRoutes = express.Router()

messagesRoutes.route('/:roomID').get(privat, getRoomMessages)
messagesRoutes.route('/insert-message').post(privat, insertMessage)

export default messagesRoutes