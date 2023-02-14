import { NextFunction, Request, Response } from 'express'
import * as orderRepository from '../repositories/order.repository'

import { IOrder } from '../types'
import { pusher } from '../config/server'
import { notifyNewOrder, notifyUpdateOrderStatus } from '../events'
import { isObjectIdOrHexString } from 'mongoose'

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params._id as string
  const status = req.query.status as string

  await orderRepository.updateOrderStatus(_id, status)

  await pusher.trigger('client', 'update-order-status', status)
  notifyUpdateOrderStatus(status, _id)
  res.status(200).end()
}

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.params.orderId
  const order = await orderRepository.getOrderById(orderId)
  res.status(200).json(order)
}

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.query

  const orders = await orderRepository.getOrders({
    status: params.status as string,
    today: params.today === 'true',
  })
  res.status(200).json(orders)
}

export const getClientOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientId = req.params.clientId

  if (clientId === '' || !isObjectIdOrHexString(clientId))
    return res.status(400).json({
      isSuccess: false,
      message: 'Erro ao buscar o histórico de pedidos',
    })

  const orders = await orderRepository.getClientOrders(clientId)
  res.status(200).json(orders)
}

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newOrder = req.body as IOrder

  const orderId = await orderRepository.addOrder({
    status: 'to-do',
    clientId: newOrder.clientId,
    addressId: newOrder.addressId,
    orderItemsId: req.orderItemsId,
    isDelivery: newOrder.isDelivery,
    paymentType: newOrder.paymentType,
    payback: newOrder.payback,
  })

  if (!orderId) return next(0)

  await pusher.trigger('admin', 'new-order', orderId)
  notifyNewOrder()

  res.status(200).json({ orderId })
}
