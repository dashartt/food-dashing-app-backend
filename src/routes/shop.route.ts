import { Router } from 'express'
import {
  getShops,
  addShop,
  saveShopSettings,
} from '../controllers/shop.controller'

const router = Router()

router.get('/', getShops)
router.post('/', addShop)
router.patch('/:shopId', saveShopSettings)

export default router
