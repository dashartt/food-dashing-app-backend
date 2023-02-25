import { Router } from 'express'
import * as wppWebhookController from '../controllers/wppWebhook.controller'

const router = Router()

router.post('/', wppWebhookController.postWebhook)

router.get('/', wppWebhookController.getWebhook)

export default router
