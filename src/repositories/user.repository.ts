import UserModel from '../database/models/user.model'
import { ICredential, IUser } from '../types/user.type'

export const signup = async (account: IUser) =>
  UserModel.create({ ...account })
    .then((data) => ({ data }))
    .catch(() => ({ data: null }))

export const signin = async ({ email, password }: ICredential) =>
  UserModel.findOne({
    $and: [{ email }, { password }],
  })
    .then((data) => ({ data }))
    .catch(() => ({ data: null }))

export const update = async (data: Partial<IUser>) =>
  UserModel.findByIdAndUpdate(data._id, {
    ...data,
  })
    .then((data) => ({ data: data?._id }))
    .catch(() => ({ data: null }))
