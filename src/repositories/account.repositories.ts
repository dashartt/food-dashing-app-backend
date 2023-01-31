import AccountModel from '../database/models/account.model'
import { IAccount } from '../types'

export const registerAccount = async ({
  fullName,
  password,
  role,
}: IAccount) => {
  const account = await AccountModel.create({ fullName, password, role })
  console.log('\x1b[33m%s\x1b[0m', `=>  Account created, role: ${role}`)
  return {
    data: account as IAccount,
  }
}

export const authAccount = async ({ password }: Omit<IAccount, 'role'>) => {
  try {
    const account = await AccountModel.findOne({
      password,
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
