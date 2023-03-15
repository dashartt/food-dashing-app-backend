import { Request, Response } from 'express'
import * as shopRepository from '../repositories/shop.repository'
import * as addressRepository from '../repositories/address.repositories'

import { IShopSettings } from '../types/shop/settings.type'
import { IAddress } from '../types/address.type'

export const addShop = async (req: Request, res: Response) => {
  const shopInfo = req.body as Partial<IShopSettings>
  let addressId = null

  const shopNameResponse = await shopRepository.findShopByName(
    shopInfo.shopName || ''
  )

  if (shopNameResponse.data) {
    return res.status(400).json({
      data: null,
      message: 'Esse nome já está sendo utilizado',
    })
  }

  const findAddressResponse = await addressRepository.findAddress(
    shopInfo.shopAddress as IAddress
  )

  if (findAddressResponse.data) {
    const shopAddressResponse = await shopRepository.findShopByAddress(
      shopInfo.shopAddress as IAddress
    )

    if (shopAddressResponse.data) {
      return res.status(400).json({
        data: null,
        message: 'Endereço já vinculado a uma loja',
      })
    }
  }

  if (!findAddressResponse.data) {
    const address = await addressRepository.addAddress(
      shopInfo.shopAddress as IAddress
    )
    addressId = address.data?._id
  }
  addressId = findAddressResponse.data?._id

  const addShopResponse = await shopRepository.addShop({
    ...shopInfo,
    shopAddress: { _id: addressId },
  })

  if (!addShopResponse.data)
    return res.status(400).json({
      message: 'Erro ao criar a loja',
      data: null,
    })

  return res.status(201).json({
    message: 'Loja criada com sucesso',
    data: addShopResponse.data,
  })
}

export const getShops = async (req: Request, res: Response) => {
  const query = req.query

  if (query?.addressPlaceIdAndHouseNumber) {
    const shopAddress =
      await shopRepository.findShopByAddressPlaceIdAndHousenumber(
        query.addressPlaceIdAndHouseNumber as string
      )

    if (shopAddress.data) {
      return res.status(400).json({
        data: {
          isDuplicated: true,
        },
        message: 'Já existe uma loja com esse endereço',
      })
    }
    return res.status(200).json({
      data: {
        isDuplicated: false,
      },
      message: 'Endereço disponível',
    })
  }
  if (query?.shopName) {
    const shopExist = await shopRepository.findShopByName(
      query?.shopName as string
    )

    if (shopExist.data) {
      return res.status(400).json({
        data: {
          isDuplicated: true,
        },
        message: 'Já existe uma loja com esse nome',
      })
    }
    return res.status(200).json({
      data: {
        isDuplicated: false,
      },
      message: 'Nome disponível',
    })
  }

  if (query?.ownerId) {
    const ownerShops = await shopRepository.getShopsByOwner(
      query?.ownerId as string
    )

    return res.status(200).json({
      message: 'Resultado de lojas desse usuário',
      data: ownerShops.data,
    })
  }

  return res.status(400).json({
    data: null,
    message:
      'Nenhum parâmetro informado para buscar informações para esse endpoint',
  })
}
