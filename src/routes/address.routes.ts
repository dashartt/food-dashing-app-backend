import { Router } from 'express'
import { addAddress } from '../controllers/address.controller'

const router = Router()

router.post('/', addAddress)

export default router
