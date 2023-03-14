import { Schema, model } from 'mongoose'
import { IAddress } from '../../types/address.type'

export const addressSchema = new Schema<IAddress>({
  lat: { type: Number },
  lon: { type: Number },
  place_id: { type: String },
  street: { type: String },
  housenumber: { type: String },
  complement: { type: String, required: false },
  suburb: { type: String },
  referencePoint: { type: String, required: false },
  state_code: { type: String },
  postcode: { type: String },
  city: { type: String },
  country: { type: String },
})

const AddressModel = model<IAddress>('Address', addressSchema)

export default AddressModel
