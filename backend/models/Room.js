import { Schema, model, Types } from "mongoose";

const roomSchema = new Schema({
  chatName: {
    type: String,
  },
  
  isGroupChat: {
    type: Boolean,
    default: false
  },

  users: [{
    type: Types.ObjectId,
    ref: 'User'
  }],

  latestMsg: {
    type: Types.ObjectId,
    ref: 'Message'
  }

}, {
  timestamps: true
})

const Room = model('Room', roomSchema)
export default Room