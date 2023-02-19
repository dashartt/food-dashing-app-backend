import AdditionalModel from '../database/models/additional.model'
import { IAdditional } from '../types'

export const addAdditional = async (additionalDTO: IAdditional) => {
  const additional = await AdditionalModel.create({ ...additionalDTO })
  console.log('\x1b[33m%s\x1b[0m', '=>  additional created')
  return {
    data: additional as IAdditional,
  }
}
