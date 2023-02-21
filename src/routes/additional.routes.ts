import { Router } from 'express'
import {
  addAdditional,
  getAdditionals,
} from '../controllers/additional.controller'

const router = Router()

router.post('/', addAdditional)
router.get('/', getAdditionals)

export default router
