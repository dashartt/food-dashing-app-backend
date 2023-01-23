import { Router } from 'express'
import {
  addOrder,
  getOrderById,
  getOrders,
  getClientOrders,
  updateOrderStatus,
} from '../controllers/order.controller'
import { addOrderItems } from '../controllers/orderItems.controller'

const router = Router()

router.post('/', addOrderItems, addOrder)
router.get('/', getOrders)
router.get('/client/:clientId', getClientOrders)
router.get('/:orderId', getOrderById)
router.patch('/:_id', updateOrderStatus)

export default router
