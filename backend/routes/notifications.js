import express from 'express'
import privat from '../middlewares/auth.js'
import { getNotifications } from '../controllers/notifications.js'

const notificationsRoutes = express.Router()

notificationsRoutes.route('/').get(privat, getNotifications)

export default notificationsRoutes