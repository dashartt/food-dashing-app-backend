import { Router } from 'express'
import itemCategoryRouter from '../routes/itemCategory.routes'
import menuItemRouter from '../routes/menuItem.routes'
import addressRouter from '../routes/address.routes'
import orderRouter from '../routes/order.routes'
import user from './user.route'
import additionalRouter from './additional.routes'
import shopRouter from './shop.route'

const router = Router()

router.use('/shops', shopRouter)

router.use('/user', user)
router.use('/address', addressRouter)

router.use('/menu', menuItemRouter)
router.use('/category', itemCategoryRouter)
router.use('/additional', additionalRouter)

router.use('/orders', orderRouter)

export default router
