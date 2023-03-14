import express, { Errback, NextFunction, Request, Response } from 'express'
import Pusher from 'pusher'
import PushNotifications from '@pusher/push-notifications-server'
import cors from 'cors'
import routes from '../routes'

// Constans ------------------------------>
const ENV = process.env.NODE_ENV || 'dev'
const FRONTEND_URL =
  ENV === 'dev' ? `http://localhost:3000` : 'https://fooddashingapp.vercel.app'

// Initialize ----------------------->
const app = express()
export const pusher = new Pusher({
  appId: process.env.PUSHER_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  // useTLS: true,
})
export const beamsClient = new PushNotifications({
  instanceId: process.env.BEAM_ID as string,
  secretKey: process.env.BEAM_KEY as string,
})

// Config ----------------------->
app.use(express.json())
app.use(
  cors({
    origin: FRONTEND_URL,
    preflightContinue: true,
  })
)
app.use(express.urlencoded({ extended: false }))

// Routes ----------------------->
app.use(routes)
app.get('/', async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Server is alive' })
})

// Error Middleware  ----------------------->
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ message: 'Internal Server Error' })
})

// Export Server  ----------------------->
export default app
