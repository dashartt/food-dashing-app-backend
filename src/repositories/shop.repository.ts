import ShopModel from '../database/models/shop.model'
import { IAddress } from '../types/address.type'
import { IShopSettings } from '../types/shop/settings.type'

export const findShopByAddressPlaceIdAndHousenumber = async (
  shopAddressPlaceIdAndHousenumber: string
) => {
  const [placeId, houseNumber] = shopAddressPlaceIdAndHousenumber.split('|')
  return ShopModel.findOne()
    .populate({
      path: 'shopAddress',
      match: {
        $and: [{ place_id: placeId }, { housenumber: houseNumber }],
      },
    })
    .then((data) => ({ data: !data?.shopAddress ? null : data }))
    .catch((e) => {
      console.log(e)
      return { data: null }
    })
}

export const findShopByAddress = async (shopAddress: IAddress) =>
  ShopModel.findOne()
    .populate({
      path: 'shopAddress',
      match: {
        $and: [
          { place_id: shopAddress.place_id },
          { housenumber: shopAddress.housenumber },
        ],
      },
    })
    .then((data) => ({ data: !data?.shopAddress ? null : data }))
    .catch((e) => {
      console.log(e)
      return { data: null }
    })

export const findShopByName = async (shopName: string) =>
  ShopModel.findOne({
    shopName,
  })
    .then((data) => ({ data }))
    .catch((e) => {
      console.log(e)
      return { data: null }
    })

export const findShopById = async (shopId: string) =>
  ShopModel.findOne({
    _id: shopId,
  })
    .populate('owner', { password: 0 })
    .populate('shopAddress')
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
    .populate('shopAddress')
    .then((data) => ({ data }))
    .catch(() => ({ data: null }))

type SaveSettingsParams = {
  shopId: string
  settings: Partial<IShopSettings>
}
export const saveShopSettings = ({
  settings,
  shopId,
}: SaveSettingsParams): Promise<{ data: null | IShopSettings }> =>
  ShopModel.findByIdAndUpdate(
    shopId,
    { ...settings },
    {
      new: true,
    }
  )
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })
