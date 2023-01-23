import { Router } from 'express'
import itemCategoryRouter from '../routes/itemCategory.routes'
import menuItemRouter from '../routes/menuItem.routes'
import addressRouter from '../routes/address.routes'
import clientRouter from '../routes/client.routes'
import orderRouter from '../routes/order.routes'

const router = Router()

router.use('/category', itemCategoryRouter)
router.use('/menu', menuItemRouter)
router.use('/address', addressRouter)
router.use('/client', clientRouter)
router.use('/orders', orderRouter)

export default router
