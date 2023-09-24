import express from 'express'
import privat from '../middlewares/auth.js'
import { getRoomMessages, insertMessage, deleteMessage } from '../controllers/messages.js'

const messagesRoutes = express.Router()

messagesRoutes.route('/insert-message').post(privat, insertMessage)
messagesRoutes.route('/:roomID').get(privat, getRoomMessages)
messagesRoutes.route('/:messageID/delete').delete(privat, deleteMessage)

export default messagesRoutes