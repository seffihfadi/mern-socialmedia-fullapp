import Message from '../models/Message.js'
import Room from '../models/Room.js'

export const getRoomMessages = async (req, res, next) => {
  const {roomID} = req.params
  try {
    if (!roomID) {
      res.status(400)
      throw new Error('error happend, try again')
    }

    const roomMessages = await Message.find({room: roomID}).populate('sender', ['image'])
    res.status(200).json(roomMessages)

  } catch (error) {
    next(error)
  }
}


export const insertMessage = async (req, res, next) => {
  const {message, roomID} = req.body
  const {_id: senderID} = req.user
  try {
    if (!message || !roomID) {
      res.status(400)
      throw new Error('error happend, try later')
    }

    const newMsg = await Message.create({room: roomID, sender: senderID, content: message})
    if (!newMsg) {
      res.status(500)
      throw new Error('message not created, try later')
    }

    await Room.findByIdAndUpdate(roomID, {latestMsg: newMsg._id})

    res.status(201).json({message: 'message sent'})
  } catch (error) {
    next(error)
  }
}


export const deleteMessage = async (req, res, next) => {
  const {_id: sesstionID} = req.user
  const {messageID} = req.params
  try {
    const message = await Message.findById(messageID)
    if (message.sender.toString() !== sesstionID.toString()) {
      res.status(400)
      throw new Error('you do not able to delete this message')
    }
    message.deleteOne()
    res.status(200).json({message: 'message deleted'})
  } catch (error) {
    next(error)
  }
}
