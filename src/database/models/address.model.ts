import { Schema, model } from 'mongoose'
import { IAddress } from '../../types'

export const addressSchema = new Schema<IAddress>(
  {
    addressName: { type: String, required: true },
    addressNumber: { type: String, required: true },
    complement: { type: String, required: false },
    districtName: { type: String, required: true },
    referencePoint: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

addressSchema.path('id')

const AddressModel = model<IAddress>('Address', addressSchema)

export default AddressModel
