import ShopModel from '../database/models/shop.model'
import { IAddress } from '../types/address.type'
import { IShopSettings } from '../types/shop/settings.type'

export const findShopByName = async (shopName: string) =>
  ShopModel.findOne({
    shopName,
  })
    .then((data) => ({ data }))
    .catch((e) => {
      console.log(e)
      return { data: null }
    })

export const addShop = async (data: Partial<IShopSettings>) =>
  ShopModel.create({
    owner: data.owner,
    shopName: data.shopName,
    shopAddress: data.shopAddress?._id,
    shopOpeningHours: data.shopOpeningHours,
  })
    .then((data) => ({ data }))
    .catch((e) => {
      console.log(e)
      return { data: null }
    })

export const getShopsByOwner = async (ownerId: string) =>
  ShopModel.find({
    owner: ownerId,
  })
    .then((data) => ({ data }))
    .catch(() => ({ data: null }))
