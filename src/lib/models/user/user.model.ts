import { type InferSchemaType, type Model, model, models, Schema, type Types } from 'mongoose'

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export type UserAttrs = InferSchemaType<typeof UserSchema>
export type UserDoc = UserAttrs & { _id: Types.ObjectId }

export const UserModel: Model<UserDoc> =
  (models.User as Model<UserDoc>) || model<UserDoc>('User', UserSchema)
