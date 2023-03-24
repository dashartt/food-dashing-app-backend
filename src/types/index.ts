import { ObjectId } from 'mongodb'

export type IUuid = {
  _id?: ObjectId
}

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

export interface IAdditional {
  _id?: ObjectId
  name: string
  price: number
  categoryIds: ObjectId[]
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
  borderType?: string
  additionalIds?: ObjectId[]
}

export interface IOrder {
  shopId: ObjectId
  clientId: ObjectId
  orderItemsId: ObjectId[]
  status: string
  addressId: ObjectId
  isDelivery: boolean
  paymentType: string
  payback?: number
  orderCount?: number
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
