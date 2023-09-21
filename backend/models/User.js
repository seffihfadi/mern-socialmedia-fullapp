import {model, Schema, Types} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'username is required'],
    match: [/^(?=.{4,18}$)[a-zA-Z]+ [a-zA-Z]+$/, "{VALUE} is not a valid fullname"]
  },
  email: {
    type: String,
    required: [true, 'eamil is required'],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "{VALUE} is not a valid gmail"]
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  image: {
    type: String,
    required: [true, 'profile image is required']
  },
  bio: {
    type: String,
    min: [5, 'bio too short'],
    max: [250, 'bio too long'],
    default: ''
  }, 
  slogan: {
    type: String,
    default: ''
  },
  connections: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
  profileViews: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: false
  } 
}, {
  timestamps: true
})


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')){
    return next()
  }else {
    // encrypt password 
    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(this.password, salt)
    this.password = hashPass
    next()

  }
})


const User = model('User', userSchema)
export default User