import OrderModel from '../database/models/order.model'
import { IOrder } from '../types'

export const updateOrderStatus = async (_id: string, status: string) => {
  try {
    await OrderModel.updateOne(
      {
        _id,
      },
      {
        status,
      }
    )
    console.log("\x1b[33m%s\x1b[0m', `=> Update Order Status")
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> Update Order Status Error")
  }
}

export const getOrderById = async (orderId: string) => {
  try {
    const order = OrderModel.findOne({ _id: orderId })
      .populate({
        path: 'clientId',
      })
      .populate({
        path: 'addressId',
      })
      .populate({
        path: 'orderItemsId',
        populate: {
          path: 'itemIds',
        },
      })

    console.log("\x1b[33m%s\x1b[0m', `=> Get Order By Id")
    return order
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> Get Order By Id error")
    return []
  }
}

export const getClientOrders = async (clientId: string) => {
  try {
    const orders = OrderModel.find({
      clientId,
    })
      .populate({
        path: 'orderItemsId',
        populate: {
          path: 'itemIds',
        },
      })
      .sort({
        createdAt: -1,
      })
    console.log("\x1b[33m%s\x1b[0m', `=> Get All Client Orders")
    return orders
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> Get All Client Orders error")
    return []
  }
}

export const getOrders = async () => {
  try {
    const orders = OrderModel.find({})
      .populate({
        path: 'orderItemsId',
        populate: {
          path: 'itemIds',
        },
      })
      .sort({
        createdAt: -1,
      })
    console.log("\x1b[33m%s\x1b[0m', `=> Get All Orders")
    return orders
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> Get All Orders error")
    return []
  }
}

export const addOrder = async (orderDTO: IOrder) => {
  try {
    const orderId = await OrderModel.create({
      ...orderDTO,
    })

    console.log("\x1b[33m%s\x1b[0m', `=> New Order inserted")
    return orderId._id
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> New Order not inserted")
    return null
  }
}
