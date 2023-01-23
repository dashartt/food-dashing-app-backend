import { Router } from 'express'
import { addClient } from '../controllers/client.controller'

const router = Router()

router.post('/', addClient)

export default router
