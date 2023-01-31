import { Schema, model } from 'mongoose'
import { IAccount } from '../../types'

export const accountSchema = new Schema<IAccount>(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

accountSchema.path('id')

const AccountModel = model<IAccount>('Account', accountSchema)

export default AccountModel
