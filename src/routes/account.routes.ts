import { Router } from 'express'
import {
  getAuth,
  register,
  validateToken,
} from '../controllers/account.controller'

const router = Router()

router.post('/auth', getAuth)
router.get('/auth', validateToken)
router.post('/', register)
export default router
