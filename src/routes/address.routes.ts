import { Router } from 'express'
import {
  addAddress,
  removeAddress,
  // updateAddress,
} from '../controllers/address.controller'

const router = Router()

router.post('/', addAddress)
// router.put('/:addressId', updateAddress)
router.delete('/:addressId', removeAddress)

export default router
