import { NextFunction, Request, Response } from 'express'
import * as orderItemRepository from '../repositories/orderItems.repository'
import { IOrder, IOrderItem } from '../types'

export const addOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const items = req.body.items as IOrderItem[]
  // console.log(items)

  const orderItemsId = await orderItemRepository.addOrderItems(items)
  // console.log(orderItemsId)

  if (orderItemsId.length === 0) return next(0)

  req.orderItemsId = orderItemsId
  next()
}
