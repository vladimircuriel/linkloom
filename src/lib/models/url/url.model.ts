import mongoose from 'mongoose'

export interface Url extends mongoose.Document {
  shortUrl: string
  originalUrl: string
  date: Date
  status: boolean
  clicks: number
  user: mongoose.Schema.Types.ObjectId
}

const UrlSchema = new mongoose.Schema<Url>(
  {
    shortUrl: {
      type: String,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean,
      default: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

export default mongoose.models.Url || mongoose.model('Url', UrlSchema)
