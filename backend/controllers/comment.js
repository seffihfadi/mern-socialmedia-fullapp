import Comment from "../models/Comment.js"
import Post from '../models/Post.js'
import { sendNotification, unsendNotification } from "./notifications.js"

export const createComment = async (req, res, next) => {
  const {comment, postID, commentID, replayFor} = req.body
  const {_id: sessionID} = req.user
  try {
    const isReplay = commentID !== ''
    if (!postID.match(/^[0-9a-fA-F]{24}$/) || isReplay && !commentID.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400)
      throw new Error('bad data provided !')
    }

    const post = await Post.findById(postID)
    if (!post) {
      res.status(400)
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
        res.status(400)
        throw new Error('parent comment not found')
      }
      parent.replays += 1
      parent.save()
    }
    const newComment = await Comment.create(commentDoc)
    if (!newComment) {
      res.status(400)
      throw new Error('failed to create comment')
    }
    
    post.comments += 1
    post.save()

    // Send a notification if the sessionID (user) is not the owner of the post.
    if (sessionID.toString() !== post.owner.toString()) {
      // Check if this is a reply and the reply is not for the post owner.
      if (isReplay && replayFor !== post.owner) {
        // Notify the original commenter that there's a reply to their comment.
        await sendNotification(sessionID, replayFor, 'has written #num# replies to your comment', `/?post=${postID}`);
      }
      // Notify the owner that someone has commented on their post.
      await sendNotification(sessionID, post.owner, 'has written #num# comments to your post', `/profile?post=${postID}`);
    }

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
    if (!commentID.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400)
      throw new Error('We cannot delete this comment at the moment; please try again later as it was just created.')
    }
    const comment = await Comment.findOneAndDelete({_id: commentID, owner: sessionID})
    if (!comment) {
      res.status(400)
      throw new Error('comment not found !')
    }

    const deleteResult = await Comment.deleteMany({ isReplay: true, parent: comment._id })
    const deletedCount = deleteResult.deletedCount
    // Decrement the comments count in the associated Post
    const postOwner = await Post.findByIdAndUpdate(comment.postID , { $inc: { comments: -deletedCount-1 } })
    const commentOwner = await Comment.findByIdAndUpdate(comment.parent, { $inc: {replays: -deletedCount-1} })

    // console.log(' postOwner',  postOwner)
    // console.log('commentOwner', commentOwner)
    // Delete notes if exists
    if (!!commentOwner) {
      await unsendNotification(sessionID, commentOwner.owner, 'has written #num# replies to your comment')
    }
    await unsendNotification(sessionID, postOwner.owner, 'has written #num# comments to your post')

    res.status(200).json({message: `your ${comment.isReplay ? 'replay' : 'comment'} deleted successfuly.`})
    
  } catch (error) {
    next(error)
  }
}