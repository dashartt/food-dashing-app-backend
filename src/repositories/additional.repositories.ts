import AdditionalModel from '../database/models/additional.model'
import { IAdditional } from '../types'

export const addAdditional = async (additionalDTO: IAdditional) => {
  const additional = await AdditionalModel.create({ ...additionalDTO })
  console.log('\x1b[33m%s\x1b[0m', '=> Additional created')
  return additional as IAdditional
}

export const getAdditionals = async () => {
  const additionals = await AdditionalModel.find().populate('categoryId')
  console.log('\x1b[33m%s\x1b[0m', '=> Get additionals successfully')

  return additionals
}
