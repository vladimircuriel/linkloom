import { type InferSchemaType, type Model, model, models, Schema, type Types } from 'mongoose'

const VisitSchema = new Schema(
  {
    visits: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  },
)

export type VisitDoc = InferSchemaType<typeof VisitSchema> & { _id: Types.ObjectId }
export const VisitModel: Model<VisitDoc> =
  (models.Visit as Model<VisitDoc>) || model<VisitDoc>('Visit', VisitSchema)

export default VisitModel
