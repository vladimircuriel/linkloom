import mongoose from 'mongoose'

export interface Click extends mongoose.Document {
  clicks: number
}

const ClickSchema = new mongoose.Schema<Click>(
  {
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Click || mongoose.model<Click>('Click', ClickSchema)
