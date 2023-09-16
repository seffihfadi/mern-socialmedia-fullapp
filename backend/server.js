import cors from 'cors'
import express from "express"
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import errorHandler from './middlewares/error.js'

import userRoutes from "./routes/user.js"
import chatRoutes from "./routes/chat.js"
import postRoutes from "./routes/post.js"
import commentRoutes from './routes/comment.js'
import messagesRoutes from "./routes/messages.js"
import notificationsRoutes from './routes/notifications.js'
import connectionRequestsRoutes from "./routes/connectionRequests.js"

// init
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(express.json({limit: '6mb'}))
app.use(bodyParser.json({limit: '6mb'}))
app.use(bodyParser.urlencoded({limit: '6mb', extended: false}))
app.use(cookieParser())


// routes middlewares
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/notifications', notificationsRoutes)
app.use('/api/connection-requests', connectionRequestsRoutes)

// error middlewares
app.use(errorHandler)

// connect to db and start server
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: 'chatio'
  })
  .then(() => {
    app.listen(port, () => {
      console.log('server runing on port ' + port)
    })
  })
  .catch((err) => {
    console.log('Error of Connection to DB', err)
  })