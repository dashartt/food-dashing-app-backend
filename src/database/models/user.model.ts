import { Schema, model } from 'mongoose'
import { IUser } from '../../types/user.type'
import { addressSchema } from './address.model'

export const userSchema = new Schema<IUser>({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  addresses: {
    type: [addressSchema],
    required: false,
  },
})

const UserModel = model<IUser>('User', userSchema)

export default UserModel
