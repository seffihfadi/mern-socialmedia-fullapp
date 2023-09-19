import cors from 'cors'
import express from "express"
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import errorHandler from './middlewares/error.js'

import {Server} from 'socket.io'
import http from 'http'

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


// socket server
const server = http.createServer(app)   // create http server with express
const io = new Server(server, {
  pingTimeout: 50000,
  cors: {
    origin: 'http://localhost:5173',
  }
})  

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
try {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'chatio'
  })

  io.on('connection', (socket) => {
    // User Join Chat
    socket.on('joinChat', (data) => {

      // Make him out from all old rooms
      socket.userID = data.user._id
      for (const oldRoomID of socket.rooms) {
        if (oldRoomID !== data.room._id) {
          socket.leave(oldRoomID)
          socket.emit('leaveChat')
        }
      }
      
      // Join a new Chat (room)
      socket.join(data.room._id)
      const numConnections = io.sockets.adapter.rooms.get(data.room._id).size
      if (numConnections > 1) {
        // Send a Joined if the there are multiple users in chat
        socket.to(data.room._id).emit('joined')
        socket.on('new-message', (newMessageDoc) => {
          socket.to(data.room._id).emit('new-message-back', newMessageDoc)
        })
      }
    })
    
    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`)
    })
  })
  
  server.listen(port, () => {
    console.log('server runing on port ' + port)
  })
  
} catch (err) {
  console.log('Error of Connection to DB', err)
}








// data.room.users.forEach(u => {
  // console.log(data.room._id, 'rm', numConnections)
  // const rm = io.sockets.adapter.rooms[data.room._id];
  
  // console.log(data.user.fullname + ' leave chat ' + oldRoomID)
  // console.log('data.room', data.room)
  // console.log('data.user', data.user)
  // console.log(data.user.fullname + ' joined chat ' + data.room._id)
  //   // console.log('u._id !== data.user._id', u._id !== data.user._id)
  //   //if (u._id !== data.user._id) {
    //   //}
    // });
    //console.log(`Socket ${socket.id} connected`);