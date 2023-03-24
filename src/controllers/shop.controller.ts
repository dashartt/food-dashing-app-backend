import { Request, Response } from 'express'
import * as shopRepository from '../repositories/shop.repository'
import * as orderRepository from '../repositories/order.repository'
import * as orderController from '../controllers/order.controller'
import * as addressRepository from '../repositories/address.repositories'

import { IShopSettings } from '../types/shop/settings.type'
import { IAddress } from '../types/address.type'
import { isObjectIdOrHexString } from 'mongoose'

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

export const getRootHandler = async (req: Request, res: Response) => {
  const query = req.query

  if (query?.shopId && query?.getOrders === 'true') {
    console.log(query.shopId)
    console.log(query.ordersStatus)
    console.log(query.ordersToday)

    const response = await orderRepository.getShopOrders({
      shopId: query?.shopId as string,
      status: query?.ordersStatus as string,
      today: query?.ordersToday === 'true',
    })

    return res.status(200).json({
      data: response.data,
      message: 'Busca de pedidos realizada com sucesso',
    })
  }
  if (query?.shopId && query?.userId) {
    const { shopId = '', userId = '' } = query

    const orders = await orderRepository.getClientOrders(
      shopId as string,
      userId as string
    )
    return res.status(200).json({
      data: orders,
      message: 'Sucesso ao buscar os pedidos',
    })
  }
  if (query?.shopId && query?.orderId) {
    const { shopId = '', orderId = '' } = query
    const response = await orderRepository.getOrderById(
      shopId as string,
      orderId as string
    )

    if (!response.data) {
      return res.status(404).json({
        data: null,
        message: 'Pedido não encontrado',
      })
    }

    return res.status(200).json({
      data: response.data,
      message: 'Pedido encontrado',
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
  if (query?.shopId) {
    const shop = await shopRepository.findShopById(query?.shopId as string)

    if (!shop.data) {
      return res.status(404).json({
        data: null,
        message: 'Nenhuma loja encontrada',
      })
    }
    return res.status(200).json({
      data: shop.data,
      message: 'Loja encontrada',
    })
  }
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

  return res.status(400).json({
    data: null,
    message:
      'Nenhum parâmetro informado para buscar informações para esse endpoint',
  })
}

export const saveShopSettings = async (req: Request, res: Response) => {
  const shopId = req.params.shopId as string
  const values = req.body as Partial<IShopSettings>
  let response = null

  if (values.categories) {
    response = await shopRepository.saveShopSettings({
      shopId,
      settings: {
        categories: values.categories,
      },
    })
  }

  if (values.items) {
    response = await shopRepository.saveShopSettings({
      shopId,
      settings: {
        items: values.items,
      },
    })
  }

  if (values.additional) {
    response = await shopRepository.saveShopSettings({
      shopId,
      settings: {
        additional: values.additional,
      },
    })
  }

  if (values.shopOpeningHours || values.deliveryFees) {
    response = await shopRepository.saveShopSettings({
      shopId,
      settings: {
        // ...(values.shopAddress && { shop: values.shopName }),
        ...(values.deliveryFees && { deliveryFees: values.deliveryFees }),
        ...(values.shopOpeningHours && {
          shopOpeningHours: values.shopOpeningHours,
        }),
      },
    })
  }

  return res.status(200).json({
    data: response?.data,
    message: response?.data
      ? 'Alterações registradas'
      : 'Erro ao registrar alterações',
  })
}
