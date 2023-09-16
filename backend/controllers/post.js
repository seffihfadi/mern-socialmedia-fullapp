import Post from '../models/Post.js'
import cloudinary from '../utils/cloudinary.js'
import { Types } from 'mongoose'

export const createPost = async (req, res, next) => {
  const {desc, images, privacy} = req.body
  const {_id: sessionID} = req.user
  try {
    if (images.length < 1 || !privacy) {
      res.status(400)
      throw new Error('image and privacy are required')
    }
    const urls = []
    let postTags = []
    for (const image of images) { //{secure_url: url}
      const {secure_url: url, tags} = await cloudinary.uploader.upload(image, {
        folder: 'Zoquix',
        categorization: "google_tagging",
        auto_tagging: 0.6,
      })
      urls.push(url)
      postTags = postTags.concat(tags)
    }
    console.log('tags', postTags)


    if (urls.length < images.length) {
      res.status(500)
      throw new Error('Error was happend !')
    }
    // const response = await axios.post('https://api.imagga.com/v2/tags', {image: images[0]}, 
    //   {headers: {
    //     Authorization: `Basic ${Buffer.from(`${process.env.IMAGGA_API_KEY}:${process.env.IMAGGA_API_SECRET}`).toString('base64')}`,
    //   }}
    // )

    //const tags = response.data.resault.tags || null
    
    const newPost = await Post.create({owner: sessionID, images: urls, desc, privacy, tags: postTags})
    if (!newPost) {
      res.status(500)
      throw new Error('post not created')
    }
    res.status(201).json({message: 'post created'})

  } catch (error) {
    next(error)
  }
}


export const getFeed = async (req, res, next) => {
  const user = req.user
  try {
    const feed = await Post.find(
      {$or: 
        [
          {privacy: 'public'}, 
          {privacy: 'connections', $or: [{owner: user._id}, {owner: {$in: user.connections}}]}
        ]
      }
    ).populate('owner', ['fullname', 'image']).sort('-createdAt')

    const updatedFeed = feed.map(post => ({
      ...post.toObject(),
      isLiked: post.reactions.includes(user._id) ? true : false
    }))
    res.status(200).json(updatedFeed)
  } catch (error) {
    next(error)
  }
}


export const likePost = async (req, res, next) => {
  const {postID} = req.params
  const {_id: sessionID} = req.user
  try {
    const post = await Post.findById(postID)
    const isLiked = post.reactions.includes(sessionID)
    if (isLiked) {
      post.reactions.pull(sessionID)
    } else {
      post.reactions.push(sessionID)
    }
    post.save()
    
    res.status(200).json(post.reactions.length)
  } catch (error) {
    next(error)
  }
}


export const getPost = async (req, res, next) => {
  const {postID} = req.params
  const {_id: sessionID} = req.user
  try {
    if (!postID.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400)
      throw new Error('post not found !')
    }
    const post = await Post.findById(postID).where({owner: sessionID}).select(['privacy', 'images', 'desc'])
    if (!post) {
      res.status(400)
      throw new Error('post not found !')
    }
    res.status(200).json(post)
    
  } catch (error) {
    next(error)
  }
}


export const updatePost = async (req, res, next) => {
  const {postID} = req.params
  const {desc, privacy} = req.body
  try {
    const post = await Post.findById(postID)
    if (!post) {
      res.status(400)
      throw new Error('post not found !')
    }
    post.desc = desc
    post.privacy = privacy
    post.save()

    res.status(200).json({message: 'post updated successfuly'})
  } catch (error) {
    next(error)
  }
}


export const deletePost = async (req, res, next) => {
  const {postID} = req.params
  const {_id: sessionID} = req.user 
  try {
    const post = await Post.deleteOne({_id: postID, owner: sessionID})
    if (!post) {
      res.status(400)
      throw new Error('post not found !')
    }

    res.status(200).json({message: 'post deleted successfuly'})
  } catch (error) {
    next(error)
  }
}


export const getExplore = async (req, res, next) => {
  const {searchQuery} = req.query
  try {
    const searchDoc = {
      privacy: 'public'
    }
    if (!!searchQuery) {
      searchDoc.$or = [
        {desc: {$regex: searchQuery}},
        {tags: {$elemMatch: {$regex: searchQuery}}}
      ]
    }

    const explore = await 
    Post
      .find(searchDoc)
      .select(['owner', 'images', 'tags', 'createdAt'])
      .populate('owner', ['fullname', 'image'])

    res.status(200).json(explore)
  } catch (error) {
    next(error)
  }
}


export const getTags = async (req, res, next) => {
  try {
    const tags = await Post.aggregate([
      {$unwind: "$tags"},
      {$limit: 20},
      {
        $group: {
          _id: null, // Group all documents together
          tags: { $addToSet: "$tags" } // Add all unique tags to the "tags" array
        }
      },
      {
        $project: {
          _id: 0, // Exclude the "_id" field from the result
          tags: 1 // Include only the "tags" field in the result
        }
      }
    ])
    res.status(200).json(tags[0].tags)

  } catch (error) {
    next(error)
  }
}

export const getUserPosts = async (req, res, next) => {
  const user = req.user
  const {userID} = req.params
  try {
    const posts = await Post.find(
      {owner: userID,
      $or: 
        [
          {privacy: 'public'}, 
          {privacy: 'connections', $or: [{owner: user._id}, {owner: {$in: user.connections}}]},
          {privacy: 'privat', owner: user._id}
        ]
      })
      .populate('owner', ['fullname', 'image'])
      .sort('-createdAt')

    const updatedPosts = posts.map(post => ({
      ...post.toObject(),
      isLiked: post.reactions.includes(user._id) ? true : false
    }))
    res.status(200).json(updatedPosts)
    
  } catch (error) {
    next(error)
    
  }
}
