import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema({
  room: {
    type: Types.ObjectId,
    ref: 'Room'
  },
  sender: {
    type: Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  readBy: [{
    type: Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

const Message = model('Message', messageSchema)
export default Message