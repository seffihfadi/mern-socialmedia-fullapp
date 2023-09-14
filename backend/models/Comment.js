import {Schema, model, Types} from 'mongoose'


const commentSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  },
  postID: {
    type: Types.ObjectId,
    ref: 'Post'
  },
  parent: {
    type: Types.ObjectId,
    ref: 'Comment'
  },
  isReplay: {
    type: Boolean,
    default: false
  },
  replays: {
    type: Number,
    default: 0
  },
  body: {
    type: String,
    maxLength: 250
  },
}, {
  timestamps: true
})

const Comment = model('Comment', commentSchema)
export default Comment
