import { Schema, model } from 'mongoose'
import { IUser } from '../../types/user.type'

export const userSchema = new Schema<IUser>({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address', require: false }],
})

const UserModel = model<IUser>('User', userSchema)

export default UserModel
