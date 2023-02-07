import { ObjectId } from 'mongodb'

// ADDRESS  TYPE --------------------->
export interface IAddress {
  _id?: ObjectId
  addressName: string
  addressNumber: string
  complement: string
  referencePoint: string
  districtName: string
}

export interface IAddresses extends Array<IAddress> {}

// ITEM CATEGORY TYPE ------------->
export interface IITemCategory {
  _id?: ObjectId
  name: string
}

// MENU ITEM TYPE ---------------->
export interface IMenuItem {
  _id?: ObjectId
  categoryId: ObjectId
  name: string
  price: number
  ingredients?: string
}

export interface IMenuItemOutput extends Omit<IMenuItem, 'categoryId'> {
  _id?: ObjectId
  category: IITemCategory
  name: string
  price: number
  ingredients?: string
}

// ORDER TYPE ------------------>
export interface IOrderItem {
  _id?: ObjectId
  itemIds: ObjectId[]
  quantity: number
  observation?: string
}

export interface IOrder {
  status: string
  orderCount?: number
  clientId: ObjectId
  addressId: ObjectId
  orderItemsId: ObjectId[]
  paymentType: string
  payback?: number
}

export interface IOrderSearchParams {
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

export interface IToken {
  token: string
}

export interface IAccessToken extends IToken, Omit<IAccount, 'password'> {}

declare global {
  namespace Express {
    interface Request {
      // attr: type
      orderItemsId: ObjectId[]
      accessToken?: IAccessToken
    }
  }
}
