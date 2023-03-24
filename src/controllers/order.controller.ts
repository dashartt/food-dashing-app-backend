import { NextFunction, Request, Response } from 'express'
import * as orderRepository from '../repositories/order.repository'

import { IOrder } from '../types'
import { pusher } from '../config/server'
import { notifyNewOrder, notifyUpdateOrderStatus } from '../events'
import { isObjectIdOrHexString } from 'mongoose'

export const updateOrderStatus = async (req: Request, res: Response) => {
  const _id = req.params._id as string
  const status = req.query.status as string

  await orderRepository.updateOrderStatus(_id, status)

  pusher.trigger('client', 'update-order-status', status)
  notifyUpdateOrderStatus(status, _id)
  res.status(200).end()
}

export const getOrderById = async (req: Request, res: Response) => {
  const { shopId = '', orderId = '' } = req.params
  const response = await orderRepository.getOrderById(shopId, orderId)

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

  const orders = await orderRepository.getShopOrders({
    shopId: query?.shopId as string,
    status: query.status as string,
    today: query.today === 'true',
  })
  res.status(200).json({
    data: orders,
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

  const orders = await orderRepository.getClientOrders(shopId, clientId)
  res.status(200).json({
    data: orders,
    message: 'Sucesso ao buscar os pedidos',
  })
}

export const addOrder = async (req: Request, res: Response) => {
  const newOrder = req.body as IOrder
  console.log(newOrder)

  const order = await orderRepository.addOrder({
    shopId: newOrder.shopId,
    status: 'to-do',
    clientId: newOrder.clientId,
    addressId: newOrder.addressId,
    orderItemsId: req.orderItemsId,
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

  pusher.trigger('admin', 'new-order', order.data._id)
  notifyNewOrder()

  res.status(200).json({
    data: {
      orderId: order.data._id,
    },
    message: 'Novo pedido recebido!',
  })
}
