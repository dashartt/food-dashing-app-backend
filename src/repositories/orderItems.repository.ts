import OrderItemsModel from '../database/models/orderItems.model'
import { IOrderItem } from '../types'

export const addOrderItems = async (orderItemsDTO: IOrderItem[]) => {
  try {
    const itemsIds = await OrderItemsModel.insertMany(orderItemsDTO)
    console.log("\x1b[33m%s\x1b[0m', `=> 🚀 New Order Items inserted")
    return itemsIds.map((item) => item._id)
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> 🚀 New Order Items not inserted")
    return []
  }
}
