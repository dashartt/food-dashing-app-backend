import { Request, Response } from 'express'
import * as orderRepository from '../repositories/order.repository'

import { pusher } from '../config/server'
import { notifyNewOrder, notifyUpdateOrderStatus } from '../events'
import { isObjectIdOrHexString, ObjectId } from 'mongoose'
import { IOrder } from '../types/shop/order.type'

export const updateOrderStatus = async (req: Request, res: Response) => {
  const _id = req.params._id as string
  const status = req.query.status as string

  await orderRepository.updateOrderStatus(_id, status)

  pusher.trigger('client', 'update-order-status', status)
  notifyUpdateOrderStatus(status, _id)
  res.status(200).json({
    data: {
      orderId: _id,
      status,
    },
    message: 'Status do pedido alterado',
  })
}

export const getOrderById = async (req: Request, res: Response) => {
  const { shopId = '', orderId = '' } = req.params
  const response = await orderRepository.getOrderById(
    shopId as unknown as ObjectId,
    orderId as unknown as ObjectId
  )

  if (!response.data) {
    return res.status(404).json({
      data: null,
      message: 'Pedido não encontrado',
    })
  }

  res.status(200).json({
    data: response.data,
    message: 'Pedido encontrado',
  })
}

export const getOrders = async (req: Request, res: Response) => {
  const query = req.query

  const response = await orderRepository.getShopOrders({
    shopId: query?.shopId as string,
    status: query.status as string,
    today: query.today === 'true',
  })
  res.status(200).json({
    data: response.data,
    message: 'Sucesso ao buscar os pedidos',
  })
}

export const getClientOrders = async (req: Request, res: Response) => {
  const { shopId = '', clientId = '' } = req.params

  if (isObjectIdOrHexString(shopId) || !isObjectIdOrHexString(clientId))
    return res.status(400).json({
      data: null,
      message: 'Erro ao buscar o histórico de pedidos',
    })

  const response = await orderRepository.getClientOrders(
    shopId as unknown as ObjectId,
    clientId as unknown as ObjectId
  )
  console.log(response.data)

  res.status(200).json({
    data: response.data,
    message: 'Sucesso ao buscar os pedidos',
  })
}

export const addOrder = async (req: Request, res: Response) => {
  const newOrder = req.body as IOrder

  const order = await orderRepository.addOrder({
    status: 'to-do',
    shop: { _id: newOrder.shop._id },
    client: { _id: newOrder.client._id },
    address: newOrder.address,
    items: newOrder.items,
    isDelivery: newOrder.isDelivery,
    paymentType: newOrder.paymentType,
    payback: newOrder.payback,
  })

  if (!order.data) {
    return res.status(400).json({
      data: null,
      message: 'Erro ao receber pedido',
    })
  }

  // // pusher.trigger('admin', 'new-order', order.data._id)
  // // notifyNewOrder()

  res.status(200).json({
    data: {
      orderId: order.data._id,
    },
    message: 'Novo pedido recebido!',
  })
}
