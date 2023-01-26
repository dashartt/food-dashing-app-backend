import { ObjectId } from 'mongodb'
import { io } from '../config/server'

export const notifyNewOrder = (orderId: ObjectId | string) => {
  io.emit('new-order', orderId)
  console.log('[EMIT] => NEW ORDER', orderId)
}

export const notifyUpdateOrderStatus = (orderId: string, status: string) => {
  io.emit('update-status-order', status)
  console.log('[EMIT] => UPDATE STATUS ORDER', orderId)
}
