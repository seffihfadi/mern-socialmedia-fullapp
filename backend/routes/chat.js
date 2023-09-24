import express from 'express'
import privat from '../middlewares/auth.js'
import { getUserRooms, addRoom, getRoomByID } from '../controllers/chat.js'

const chatRoutes = express.Router()

chatRoutes.route('/').get(privat, getUserRooms)
chatRoutes.route('/add-room').post(privat, addRoom)
chatRoutes.route('/:roomID').get(privat, getRoomByID)

export default chatRoutes