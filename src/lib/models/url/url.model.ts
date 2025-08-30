// models/url.model.ts
import { type InferSchemaType, type Model, model, models, Schema, type Types } from 'mongoose'

const UrlSchema = new Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      maxlength: 32,
      match: [/^[a-z0-9_-]+$/i, 'Invalid short code'],
    },
    originalUrl: {
      type: String,
      required: true,
      trim: true,
      match: [/^https?:\/\/.+/i, 'Invalid URL'],
    },
    status: { type: Boolean, default: true },
    clicks: { type: Number, default: 0, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  },
)

export type UrlDoc = InferSchemaType<typeof UrlSchema> & { _id: Types.ObjectId }
export const UrlModel: Model<UrlDoc> =
  (models.Url as Model<UrlDoc>) || model<UrlDoc>('Url', UrlSchema)

export default UrlModel
