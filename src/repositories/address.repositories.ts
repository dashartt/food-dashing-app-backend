import { ObjectId } from 'mongoose'
import AddressModel from '../database/models/address.model'
import { IAddress } from '../types/address.type'

export const findAddress = async (address: IAddress) =>
  AddressModel.find({
    housenumber: address.housenumber,
    street: address.street,
    city: address.city,
  })
    .then((data: IAddress[]) => {
      const address = data.length > 0 ? data[0] : null
      return { data: address }
    })
    .catch((error) => {
      console.log(error)
      return { data: null }
    })

export const addAddress = async (address: IAddress) =>
  AddressModel.create({
    ...address,
  })
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })

export const updateAddress = async (address: IAddress) =>
  AddressModel.findByIdAndUpdate(address._id, {
    ...address,
  })
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })

export const removeAddress = async (addressId: ObjectId | string) =>
  AddressModel.findByIdAndRemove(addressId)
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })
