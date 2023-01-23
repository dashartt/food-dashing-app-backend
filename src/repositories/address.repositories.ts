import AddressModel from '../database/models/address.model'
import { IAddress } from '../types'

export const addAddress = async (addressDTO: IAddress) => {
  try {
    const address = await AddressModel.create({
      ...addressDTO,
    })
    console.log('\x1b[33m%s\x1b[0m', '=> 🚀 New Address inserted')
    return address._id
  } catch (error) {
    console.log('\x1b[33m%s\x1b[0m', '=> 🚀 New Address not inserted')
    return null
  }
}
