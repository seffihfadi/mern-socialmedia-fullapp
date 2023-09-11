import {Schema, model, Types} from 'mongoose'

const postSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  },
  desc: {
    type: String,
    maxLength: 250
  },
  images: {
    type: [{
      type: String,
    }],
    validate: {
      validator: function (array) {
        return array.length <= 3;
      }
    }
  },
  privacy: {
    type: String, 
    enum: ['public', 'connections', 'privat'], 
    default: 'public'
  },
  tags: [{
    type: String
  }],
  comments: [{
    type: Types.ObjectId,
    ref: 'Comment'
  }],
  reactions: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Post = model('Post', postSchema)
export default Post
