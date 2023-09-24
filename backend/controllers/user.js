import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import User from "../models/User.js"
import cloudinary from "../utils/cloudinary.js"
import ConnectionRequest from "../models/ConnectionRequest.js"

import { sendNotification } from "./notifications.js"

const generateToken = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, {expiresIn: '1d'})
}

const addRelationTome = async (sessionID, users) => {
  const connectionRequests = await ConnectionRequest.find({
    requester: sessionID,
    status: 'pending',
  })

  const NotFriend = users.map(user => {
    const isConnection = user.connections.includes(sessionID)
    const isRequestSender = connectionRequests.some(
      (request) => request.recipient.toString() === user._id.toString()
    )

    // Check if user is a Mongoose document before using toObject()
    const userObject = user instanceof mongoose.Document ? user.toObject() : user;

    return {
      ...userObject,
      relationTome: !!isConnection ? 'connection' : isRequestSender ? 'request' : 'unknown',
    }
  })
  return NotFriend
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
      transformation: [
        { width: 300, height: 300, crop: 'fill', quality: 50 },
        {fetch_format: "auto"}
      ]
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
      const userSession = req.user
      userSession.password = undefined
      res.status(200).json({user: userSession})
    }
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  const search = req.query.search
  const {_id: sessionID} = req.user
  try {
    if (!search) {
      res.status(200).json([])
    }else {

      const usersSearchQuery = search 
      ? 
        { $or: [
          { email: { $regex: search }}, 
          { fullname: { $regex: search }}
        ]} 
      : 
        {}
  
      const users = await User.find(usersSearchQuery).select(['image', 'fullname', 'connections', 'email', 'isActive'])
      const NotFriend = await addRelationTome(sessionID, users)
      res.status(200).json(NotFriend)
    }

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

    // if not my account increment profile views
    if (userRedID !== sessionUserID){
      const userProfile = await User.findById(userRedID)
      if (!userProfile.profileViews.includes(sessionUserID)) {
        userProfile.profileViews.push(sessionUserID)
        await userProfile.save()
        await sendNotification(sessionUserID, userRedID, 'has reviewed your profile', `/profile/${sessionUserID}`)
      }
    }

    const userProfile = await User.findById(userRedID).select('-password').populate('connections')
    // const userProfileWithRelation = await addRelationTome(sessionUserID, [userProfile])
    res.status(200).json(userProfile)
    
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  const {fullname, slogan, bio, image} = req.body
  const user = req.user
  try {
    const updatedDoc = {}
    if (user.fullname !== fullname) {
      updatedDoc.fullname = fullname
    }

    if (user.bio !== bio) {
      updatedDoc.bio = bio
    }

    if (user.slogan !== slogan) {
      updatedDoc.slogan = slogan
    }

    if (image !== '') {
      const {secure_url: url} = await cloudinary.uploader.upload(image, {
        folder: "Zoquix",
      })
      updatedDoc.image = url
    }
    if (Object.keys(updatedDoc).length === 0) {
      res.status(200).json({message: 'you did not change any thing'})
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updatedDoc)
    if (!updatedUser) {
      res.status(500)
      throw new Error('failed to update profile')
    }
    for (const connection of user.connections) {
      await sendNotification(user._id, connection, 'updated his profile', `/profile/${user._id}`)
    }

    res.status(200).json({message: 'your profile updated successfuly'})
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (req, res, next) => {
  const {oldpass, newpass} = req.body
  const user = req.user
  try {
    if (!newpass || !oldpass) {
      res.status(400)
      throw new Error('invalid data provided')
    }
    if (newpass === oldpass) {
      res.status(200).json({message: 'password updated successfully'})
    }

    const hashPass = user.password
    const isMatch = bcrypt.compareSync(oldpass, hashPass)
    if (!isMatch) {
      res.status(400)
      throw new Error('current password is wrong!')
    } else {

      const profile = await User.findById(user._id)
      profile.password = newpass
      profile.save()
  
      res.status(200).json({message: 'password updated successfully'})
    }

  } catch (error) {
    next(error)
  }
}

export const getSeggestions = async (req, res, next) => {
  const user = req.user
  try {
    let suggestions = []

    if (user.connections.length > 0) {
      const connectedUserIds = user.connections.map((connection) => connection._id)
      suggestions = await User.find({
        _id: { $nin: connectedUserIds.concat([user._id]) },
        connections: { $in: connectedUserIds },
      }).limit(6)
    } else {
      suggestions = await User.aggregate([
        { $match: { _id: { $ne: user._id } } },
        { $sample: { size: 6 } },
      ])
    }

    const NotFriend = await addRelationTome(user._id, suggestions)
    res.status(200).json(NotFriend)

  } catch (error) {
    next(error)
  }
}

export const getProfileViews = async (req, res, next) => {
  const user = req.user
  try {
    const profile = await User.findById(user._id)
    .select('profileViews')
    .populate(
      'profileViews', 
      ['image', 'fullname', 'email', 'connections']
    )

    const NotFriend = await addRelationTome(user._id, profile.profileViews)
    res.status(200).json(NotFriend)
  } catch (error) {
    next(error)
  }
}