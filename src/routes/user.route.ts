import { Router } from 'express'
import { signin, signup } from '../controllers/user.controller'
import { getShops, addShop } from '../controllers/shop.controller'

const router = Router()

// router.get('/auth', validateToken)
router.post('/signup', signup)
router.post('/signin', signin)
// router.put('/', updateAccount)

// router.get('/:ownerId/shops', getShops)
// router.post('/:ownerId/shops', addShop)

export default router
