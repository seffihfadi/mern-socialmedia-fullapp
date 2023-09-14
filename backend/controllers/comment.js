import Comment from "../models/Comment.js"
import Post from '../models/Post.js'

export const createComment = async (req, res, next) => {
  const {comment, postID, commentID} = req.body
  const {_id: sessionID} = req.user
  try {
    const isReplay = commentID !== ''
    if (!postID.match(/^[0-9a-fA-F]{24}$/) || isReplay && !commentID.match(/^[0-9a-fA-F]{24}$/)) {
      req.status(400)
      throw new Error('bad data provided !')
    }

    const post = await Post.findById(postID)
    if (!post) {
      req.status(400)
      throw new Error('post not found')
    }
    
    
    const commentDoc = {
      postID,
      body: comment,
      owner: sessionID,
    }
    if (isReplay) {
      commentDoc.parent = commentID 
      commentDoc.isReplay = true
      const parent = await Comment.findById(commentID)
      if (!parent) {
        req.status(400)
        throw new Error('parent comment not found')
      }
      parent.replays += 1
      parent.save()
    }
    const newComment = await Comment.create(commentDoc)
    if (!newComment) {
      req.status(400)
      throw new Error('failed to create comment')
    }
    
    post.comments += 1
    post.save()

    res.status(201).json({message: `your ${isReplay ? 'replay' : 'comment'} has been successfully published!`})

  } catch (error) {
    next(error)
  }
}



export const getComments = async (req, res, next) => {
  const {postID} = req.params
  try {
    const comments = await 
    Comment
      .find({postID, isReplay: false})
      .limit(5)
      .select(['body', 'owner', 'createdAt', 'replays'])
      .populate('owner', ['image', 'fullname'])
      .sort('-createdAt')

    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}



export const getReplays = async (req, res, next) => {
  const {commentID} = req.params
  try {  
    const replays = await 
    Comment
      .find({parent: commentID,isReplay: true})
      .limit(5)
      .select(['body', 'owner', 'createdAt'])
      .populate('owner', ['image', 'fullname'])
      .sort('-createdAt')
    res.status(200).json(replays)
  } catch (error) {
    next(error)
  }
}

export const deleteComment = async (req, res, next) => {
  const {commentID} = req.params
  const {_id: sessionID} = req.user
  try {
    
    const comment = await Comment.findOneAndDelete({_id: commentID, owner: sessionID})
    //console.log('comment', comment)
    if (!comment) {
      res.status(400)
      throw new Error('comment not found !')
    }
    await Comment.findByIdAndUpdate(comment.parent, {$inc: {replays: -1}})
    await Post.findByIdAndUpdate(comment.postID, {$inc: {comments: -1}})
    res.status(200).json({message: `your ${comment.isReplay ? 'replay' : 'comment'} deleted successfuly.`})
    
  } catch (error) {
    next(error)
  }
}