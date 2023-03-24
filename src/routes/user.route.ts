import { Router } from 'express'
import {
  signin,
  signup,
  verifyAuth,
  addAddress,
} from '../controllers/user.controller'

const router = Router()

router.get('/auth', verifyAuth)
router.post('/signup', signup)
router.post('/signin', signin)

// router.delete('/:userId/address', updateAccount)
router.post('/:userId/address', addAddress)
// router.patch('/:userId/address', updateAccount)

export default router
