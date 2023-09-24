import express from 'express'
import privat from '../middlewares/auth.js'
import { getNotifications, seenNotification } from '../controllers/notifications.js'

const notificationsRoutes = express.Router()

notificationsRoutes.route('/').get(privat, getNotifications)
notificationsRoutes.route('/seen').patch(privat, seenNotification)

export default notificationsRoutes