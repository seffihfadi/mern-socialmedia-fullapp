import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cloudinary from "../utils/cloudinary.js"

const generateToken = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, {expiresIn: '1d'})
}

export const signupUser = async (req, res, next) => {
  const { email, fullname, password } = req.body
  const image = req.file
  try {

    if (!fullname || !email || !password ){
      res.status(400)
      throw new Error('please fill in all required fields')
    } 

    const imageB64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + imageB64;
    const {secure_url: url} = await cloudinary.uploader.upload(dataURI, {
      folder: "Zoquix",
    })

    const user = await User.findOne({email})
    if (!!user) {
      res.status(409)
      throw new Error('user already exsits !')
    }
    
    const newUser = await User.create({
      email, 
      fullname, 
      password, 
      image: url
    })
    if (!newUser) {
      res.status(500)
      throw new Error('account not created, please try later.')
    }

    const {_id} = newUser

    // create token
    const token = generateToken(_id)
    res.cookie('zoquixToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 864e5),
      secure: true,
      sameSite: 'none',
      path: '/'
    })

    res.status(201).json({message: 'signup seccessfuly'})
  } catch (error) {
    next(error)
  }
}

export const signinUser = async (req, res, next) => {
  const {email, password} = req.body

  try {
    if (!email || !password) {
      res.status(400)
      throw new Error('fill in required fields.')
    }
    const user = await User.findOne({email}).select(['password', '_id'])
    if (!user) {
      res.status(404)
      throw new Error('user not found, you can create new accout.')
    }

    const hashPass = user.password
    const isMatch = bcrypt.compareSync(password, hashPass)
    if (!isMatch) {
      res.status(400)
      throw new Error('wrong password !')
    } 

    // create token
    const token = generateToken(user._id)
    res.cookie('zoquixToken', token, {
      
      httpOnly: true,
      expires: new Date(Date.now() + 864e5),
      secure: true,
      sameSite: 'none',
      path: '/'
    })
    res.status(200).json({message: 'signin successfuly'})
  } catch (error) {
    next(error)
  }
}

export const signoutUser = async (req, res, next) => {

  try {
    res.cookie('zoquixToken', '', {
      expires: new Date(0),
      sameSite: 'none',
      secure: true
    })
    res.status(200).json({message: 'successfuly logged out'})
  } catch (err) {
    next(err)
  }

}

export const getUser = async (req, res, next) => {
  try {
    if (!!req.user) {
      res.status(200).json({user: req.user})
    }
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  const search = req.query.search
  try {
    if (!search) {
      res.status(200).json([])
    }
    const usersSearchQuery 
    = search ? 
      { $or: [
        { email: { $regex: search }}, 
        { fullname: { $regex: search }}
      ]} 
      : 
      {}
    const users = await User.find(usersSearchQuery).select('-password')
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}


export const getUserByID = async (req, res, next) => {
  const userID = req.params.userID
  const sessionUserID = req.user._id.toString()
  try {
    let userRedID = ''
    if (userID == sessionUserID || !userID.match(/^[0-9a-fA-F]{24}$/)) {
      userRedID = sessionUserID
    } else {

      const isUserFound = await User.findById(userID)
      userRedID = !isUserFound ? sessionUserID : userID
    }

    
    const userProfile = await User.findById(userRedID).select('-password').populate('connections')
    res.status(200).json(userProfile)
    
  } catch (error) {
    next(error)
  }
}

