import { model } from 'mongoose'
import { IAddress } from '../../types/address.type'
import { addressSchema } from '../schemas'

const AddressModel = model<IAddress>('Address', addressSchema)

export default AddressModel
