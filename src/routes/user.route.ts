import { Router } from 'express'
import { signin, signup, verifyAuth } from '../controllers/user.controller'

const router = Router()

router.get('/auth', verifyAuth)
router.post('/signup', signup)
router.post('/signin', signin)
// router.put('/', updateAccount)

export default router
