import mongoose from 'mongoose'

export interface Visit extends mongoose.Document {
  visits: number
}

const visitSchema = new mongoose.Schema<Visit>(
  {
    visits: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Visit || mongoose.model<Visit>('Visit', visitSchema)
