import { type InferSchemaType, type Model, model, models, Schema, type Types } from 'mongoose'

const ClickSchema = new Schema(
  {
    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true, strict: true, versionKey: false },
)

export type ClickDoc = InferSchemaType<typeof ClickSchema> & { _id: Types.ObjectId }
export const ClickModel: Model<ClickDoc> =
  (models.Click as Model<ClickDoc>) || model<ClickDoc>('Click', ClickSchema)

export default ClickModel
