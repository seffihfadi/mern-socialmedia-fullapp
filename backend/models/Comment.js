import {Schema, model, Types} from 'mongoose'


const commentSchema = new Schema({
  postID: {
    type: Types.ObjectId,
    ref: 'Post'
  },
  
  replays: [{
    type: Types.ObjectId,
    ref: 'Comment'
  }],
  body: {
    type: String,
    maxLength: 250
  },


})

const Comment = model('Comment', commentSchema)
export default Comment
