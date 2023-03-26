import { Schema, model } from 'mongoose'
import { IUser } from '../../types/user.type'
import { userSchema } from '../schemas'

const UserModel = model<IUser>('User', userSchema)

export default UserModel
