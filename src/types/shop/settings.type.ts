import { IAddress } from '../address.type'
import { IUser } from '../user.type'
import { IAdditional, IItemCategory, IMenuItem } from './menu.type'

export type IShopOpeningHours = {
  daysOfWeek: Array<{ label: string; value: string }>
  hours: { starts: string; ends: string }
}

export type IDeliveryFeeByDistance = { upToKm: number; price: number }

export type IShopSettings = {
  owner: IUser
  shopName: string
  shopAddress: IAddress | Partial<IAddress>
  shopOpeningHours: IShopOpeningHours
  deliveryFees: IDeliveryFeeByDistance[]
  items: IMenuItem[]
  categories: IItemCategory[]
  additional: IAdditional[]
}
