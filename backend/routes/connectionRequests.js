import express from 'express'
import privat from '../middlewares/auth.js'
import { 
  sendConnectionRequest, 
  acceptConnectionRequest, 
  rejectConnectionRequest 
} from '../controllers/connectionRequests.js'

const connectionRequestsRoutes = express.Router()

connectionRequestsRoutes.post('/', privat, sendConnectionRequest)
connectionRequestsRoutes.put('/:requestID/accept', privat, acceptConnectionRequest)
connectionRequestsRoutes.put('/:requestID/reject', privat, rejectConnectionRequest)

export default connectionRequestsRoutes