import { Router } from 'express'
import { addAdditional } from '../controllers/additional.controller'

const router = Router()

router.post('/', addAdditional)

export default router
