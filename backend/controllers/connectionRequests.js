import User from "../models/User.js"
import ConnectionRequest from "../models/ConnectionRequest.js"


export const sendConnectionRequest = async (req, res, next) => {
  const receiverID = req.body.receiverID
  const sender = req.user
  try {
    if (!receiverID) {
      res.status(400)
      throw new Error("an error occurred, please try again later.")
    }

    const isSended = await ConnectionRequest.findOneAndDelete({recipient: receiverID})
    if (!!isSended) {
      res.status(200)
      throw new Error("follow request deleted successfully")
    }

    const receiverAccount = await User.findById(receiverID).select('-password')
    if (!receiverAccount) {
      res.status(404)
      throw new Error("user not found !")
    }

    const newConnectionRequest = await ConnectionRequest.create({requester: sender._id, recipient: receiverID})

    if (!newConnectionRequest) {
      res.status(500)
      throw new Error("request not sent, please try again later.")
    }
    res.status(201).json({ message: 'follow request sent successfully' })

  } catch (error) {
    next(error)
  }
}


export const acceptConnectionRequest = async (req, res, next) => {
  const { requestID } = req.params
  try {
    const request = await ConnectionRequest.findByIdAndUpdate(requestID, {status: 'accepted'})
    if (!request) {
      res.status(404)
      throw new Error('the sender remove this request.')
    }

    const requesterID = request.requester
    const recipientID = request.recipient

    const addReqInRec = await User.findByIdAndUpdate(recipientID, {$push: {connections: requesterID}})
    const addRecInReq = await User.findByIdAndUpdate(requesterID, {$push: {connections: recipientID}})
    
    if (!addRecInReq || !addReqInRec) {
      res.status(400)
      throw new Error('an error was occured !')
    }

    res.status(200).json({ message: 'Follow request accepted' });
  } catch (error) {
    next(error)
  }
}


export const rejectConnectionRequest = async (req, res, next) => {
  const { requestID } = req.params
  try {
    const request = await ConnectionRequest.findByIdAndUpdate(requestID, {status: 'rejected'})
    if (!request) {
      res.status(404)
      throw new Error('the sender remove this request.')
    }
    res.json({ message: 'Follow request rejected' })
  } catch (error) {
    next(error)
  }
}

export const connectionRequests = async (req, res, next) => {
  const receiverID = req.params.receiverID
  try {
    if(!receiverID) {
      res.status(400)
      throw new Error('you must provide receiverID.')
    }

    const requests = await ConnectionRequest.find({recipient: receiverID, status: "pending"}).populate('requester', ['fullname', '_id', 'image', 'createdAt'])
    if (!requests) {
      res.status(404).json([])
    }

    res.status(200).json(requests)
    
  } catch (error) {
    next(error)
  }
}