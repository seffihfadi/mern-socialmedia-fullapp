import express from "express"
import * as dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from "./routes/user.js"
import connectionRequestsRoutes from "./routes/connectionRequests.js"
import chatRoutes from "./routes/chat.js"
import messagesRoutes from "./routes/messages.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import errorHandler from './middlewares/error.js'


// init
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

// middlewares
//{credentials: true, origin: 'http://localhost:5173'}
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())


// routes middlewares

app.use('/api/user', userRoutes)
app.use('/api/connection-requests', connectionRequestsRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/messages', messagesRoutes)

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

