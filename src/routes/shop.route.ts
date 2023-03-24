import { Router } from 'express'
import { getClientOrders, getOrderById } from '../controllers/order.controller'
import {
  addShop,
  saveShopSettings,
  getRootHandler,
} from '../controllers/shop.controller'

const router = Router()

router.get('/', getRootHandler)
router.post('/', addShop)
router.patch('/:shopId', saveShopSettings)

export default router
