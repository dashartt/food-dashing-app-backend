import { Router } from 'express'
import {
  addDefaultMenuItems,
  getMenuItemByCategory,
  getMenuItems,
  getMenuItemByName,
} from '../controllers/menuItem.controller'

const router = Router()

router.post('/default', addDefaultMenuItems)
router.get('/', getMenuItems)
router.get('/:category', getMenuItemByCategory)
router.get('/item/:name', getMenuItemByName)

export default router
