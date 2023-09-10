import Room from '../models/Room.js'

export const getUserRooms = async (req, res, next) => {
  const {_id: userID} = req.user
  try {
    const rooms = await Room.find({users: {$in: userID}}).populate('users', ['image', 'fullname']).populate('latestMsg')
    res.json(rooms)
  } catch (error) {
    next(error)
  }
}

export const addRoom = async (req, res, next) => {
  const {_id: userID} = req.user
  const { chatName, connectionID } = req.body
  try {
    const isExist = await Room.find({users: {$all: [userID, connectionID]}})
    //console.log('isExist', isExist.length > 0, isExist)
    if (isExist.length > 0) {
      res.status(200).json({message: `chat with name ${chatName} already exists !`})
    }else{

      const newRoom = await Room.create({chatName, users: [userID, connectionID]})
      if (!newRoom) {
        res.status(500)
        throw new Error('error happend when creating the room')
      }
      res.status(200).json({message: `chat with ${chatName} created successfuly`})
    }
  } catch (error) {
    next(error)
  }
}

export const getRoomByID = async (req, res, next) => {
  const roomID = req.params.roomID
  try {
    // check if user in this room else redirect to a9
    let roomRedID = ''
    const lastRoomID = '64fc806cfc94db07530d86a9'
    if (!roomID.match(/^[0-9a-fA-F]{24}$/)) {
      roomRedID = lastRoomID
    } else {
      const isRoomFound = await Room.findById(roomID)
      roomRedID = !isRoomFound ? lastRoomID : roomID
    }

    const room = await Room.findById(roomRedID).populate('users', ['image', 'fullname']).populate('latestMsg')
    res.status(200).json(room)
    
  } catch (error) {
    next(error)
  }
}