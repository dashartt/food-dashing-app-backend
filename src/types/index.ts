import { ObjectId } from 'mongodb'
import { IAddress } from './address.type'

export type IUuid = {
  _id?: ObjectId
}

export interface IOrderSearchParams {
  shopId: string
  today?: boolean
  status?: string
}

export interface ICredentials {
  phone: string
  password: string
}

export interface IAccount extends ICredentials {
  _id?: ObjectId
  fullName: string
  role: string
  addressesId?: ObjectId[]
}

export interface IClientAccount extends Omit<IAccount, 'password'> {}

export interface IToken {
  token: string
}

export interface IAccessToken extends IToken, Omit<IAccount, 'password'> {}

declare global {
  namespace Express {
    interface Request {
      // attr: type
      addressId?: ObjectId | string | undefined
      addressesId?: ObjectId[]
      orderItemsId: ObjectId[]
      accessToken?: IAccessToken
      isForward?: boolean
    }
  }
}
