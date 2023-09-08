import { Schema, model, Types } from "mongoose"

const connectionRequestSchema = new Schema({
  requester: {
    type: Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending'
  }
}, {
  timestamps: true
})



const ConnectionRequest = model('ConnectionRequest', connectionRequestSchema)
export default ConnectionRequest