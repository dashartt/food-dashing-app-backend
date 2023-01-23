import { Schema, model } from 'mongoose'
import { IClient } from '../../types'

export const clientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    addressesId: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  },
  {
    timestamps: true,
  }
)

clientSchema.path('id')

const ClientModel = model<IClient>('Client', clientSchema)

export default ClientModel
