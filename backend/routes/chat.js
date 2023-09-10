import express from 'express'
import privat from '../middlewares/auth.js'
import { getUserRooms, addRoom, getRoomByID } from '../controllers/chat.js'

const chatRoutes = express.Router()

chatRoutes.route('/').get(privat, getUserRooms)
chatRoutes.route('/:roomID').get(privat, getRoomByID)
chatRoutes.route('/add-room').post(privat, addRoom)

export default chatRoutes