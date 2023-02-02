import { Router } from 'express'
import { addAddress, removeAddress } from '../controllers/address.controller'

const router = Router()

router.post('/', addAddress)
router.delete('/:addressId', removeAddress)

export default router
