import Post from '../models/Post.js'
import cloudinary from '../utils/cloudinary.js'

export const createPost = async (req, res, next) => {
  const {desc, images, privacy} = req.body
  const {_id: sessionID} = req.user
  try {
    if (images.length < 1 || !privacy) {
      res.status(400)
      throw new Error('image and privacy are required')
    }
    const urls = []
    for (const image of images) {
      const {secure_url: url} = await cloudinary.uploader.upload(image, {
        folder: 'Zoquix',
        // categorization: "google_tagging",
        // auto_tagging: 0.6,
      })
      urls.push(url)
    }
    // const response = await axios.post('https://api.imagga.com/v2/tags', {image: images[0]}, 
    //   {headers: {
    //     Authorization: `Basic ${Buffer.from(`${process.env.IMAGGA_API_KEY}:${process.env.IMAGGA_API_SECRET}`).toString('base64')}`,
    //   }}
    // )

    //const tags = response.data.resault.tags || null
    
    const newPost = await Post.create({owner: sessionID, images: urls, desc, privacy})
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
  const {_id: sessionID} = req.user
  try {
    const feed = await Post.find().populate('owner', ['fullname', 'image']).sort('-createdAt')
    res.status(200).json(feed)
  } catch (error) {
    next(error)
  }
}