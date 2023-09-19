import {Schema, model, Types} from 'mongoose'
// import Post from './Post.js';


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

// commentSchema.pre('save', async function (next) {
//   // 'this' refers to the comment being removed
//   console.log('deleteOne')
//   try {
//     // Remove all replies associated with this comment
//     const deleteResult = await Comment.deleteMany({ isReplay: true, parent: this._id })
//     const deletedCount = deleteResult.deletedCount
//     console.log('deletedCount', deletedCount)
//     // Decrement the comments count in the associated Post
//     await Post.findByIdAndUpdate(this.postID , { $inc: { comments: -deletedCount-1 } })
//     await Comment.findByIdAndUpdate(this.parent, { $inc: {replays: -deletedCount-1} })
//     next()
//   } catch (error) {
//     next(error)
//   }
// })

const Comment = model('Comment', commentSchema)
export default Comment
