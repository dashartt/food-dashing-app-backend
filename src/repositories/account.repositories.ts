import AccountModel from '../database/models/account.model'
import { IAccount, ICredentials } from '../types'

export const signup = async (accountDTO: IAccount) => {
  const account = await AccountModel.create({ ...accountDTO })
  console.log(
    '\x1b[33m%s\x1b[0m',
    `=>  Account created, role: ${accountDTO.role}`
  )
  return {
    data: account as IAccount,
  }
}

export const signin = async ({ phone, password }: ICredentials) => {
  try {
    const account = await AccountModel.findOne({
      $and: [{ phone }, { password }],
    })
    console.log("\x1b[33m%s\x1b[0m', `=> Account authenticated")

    return {
      data: account,
    }
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=>  Account not authenticated")
    return {
      data: null,
    }
  }
}

export const updateAccount = async (detailsDTO: IAccount) => {
  try {
    const account = await AccountModel.findByIdAndUpdate(detailsDTO._id, {
      fullName: detailsDTO.fullName, // change to fullName
      phone: detailsDTO.phone,
      addressesId: detailsDTO.addressesId,
    })
    console.log("\x1b[33m%s\x1b[0m', `=> Client account updated")
    return account?._id
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> Client account not updated")
    return null
  }
}
