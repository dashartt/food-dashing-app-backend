import { Router } from 'express'
import {
  signin,
  signup,
  validateToken,
  updateAccount,
} from '../controllers/account.controller'

const router = Router()

router.get('/auth', validateToken)
router.post('/signup', signup)
router.post('/signin', signin)
router.put('/', updateAccount)
export default router
