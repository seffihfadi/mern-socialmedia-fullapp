import Notification from "../models/Notification.js"

export const sendNotification = async (from, to, note, link) => {
  await Notification.create({from, to, note, link}) 
}

export const getNotifications = async (req, res, next) => {
  const {_id: sessionID} = req.user
  try {
    const notifications = await Notification.aggregate
    ([
      {
        $match: {
          to: sessionID,
          seen: false // Filter only unseen notifications
        }
      },
      {
        $group: {
          _id: {
            note: '$note',
            from: '$from'
          },
          count: {
            $sum: 1 // Count the number of notifications in each group
          },
          seen: {
            $first: '$seen' // Capture the 'seen' value (assuming all 'seen' values within a group are the same)
          },
          createdAt: {
            $first: '$createdAt'
          },
          link: {
            $first: '$link'
          },
          fromUser: {
            $first: '$fromUser' // Capture the populated 'fromUser' value
          },
        }
      },
      {
        $sort: {
          createdAt: -1 // Sort by 'createdAt' in ascending order (use -1 for descending order)
        }
      },
      {
        $project: {
          _id: 0, // Exclude the '_id' field from the result
          from: '$_id.from', // Include 'to' from the grouping key
          note: '$_id.note', // Include 'note' from the grouping key
          count: 1, // Include the count
          seen: 1 ,// Include the 'seen' value
          createdAt: 1,
          link: 1
        }
      },
    ])
    
    const redNotes = await (await Notification.populate(notifications, {path: "from", select: ['image', 'fullname']}))
    res.status(200).json(redNotes)

  } catch (error) {
    next(error)
  }
}

