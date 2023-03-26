import { Router } from 'express'
import orderRouter from '../routes/order.routes'
import user from './user.route'
import shopRouter from './shop.route'

const router = Router()

router.use('/user', user)
router.use('/shops', shopRouter)
router.use('/orders', orderRouter)

export default router
