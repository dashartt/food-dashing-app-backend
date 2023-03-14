import { Router } from 'express'
import { getShops, addShop } from '../controllers/shop.controller'

const router = Router()

router.get('/', getShops)
router.post('/', addShop)

export default router
