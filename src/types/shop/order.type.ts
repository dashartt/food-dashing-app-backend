import { ObjectId } from 'mongoose'
import { IUuid } from '..'
import { IAddress } from '../address.type'
import { IUser } from '../user.type'
import { IAdditional, IMenuItem } from './menu.type'
import { IShopSettings } from './settings.type'

export interface IOrderItem {
  _id?: ObjectId
  item: IMenuItem[]
  quantity: number
  observation?: string
  borderType?: string
  additional?: IAdditional[]
}

export interface IOrder extends IUuid {
  shop: Partial<IShopSettings>
  client: Partial<IUser>
  items: IOrderItem[]
  status: string
  address: Partial<IAddress>
  isDelivery: boolean
  paymentType: string
  payback?: number
  orderCount?: number
}
