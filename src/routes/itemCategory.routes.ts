import { Router } from 'express'
import { addDefaultCategories } from '../controllers/itemCategory.controller'

const router = Router()

router.post('/default', addDefaultCategories)

export default router
