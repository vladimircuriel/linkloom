import mongoose from 'mongoose'

export interface User extends mongoose.Document {
  email: string
  username: string
  password: string
  name: string
  img: string
  isAdmin: boolean
}

const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)
