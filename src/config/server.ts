import express, { Errback, NextFunction, Request, Response } from 'express'
import http from 'http'
import Pusher from 'pusher'
import cors from 'cors'
import { Server, Socket } from 'socket.io'
import routes from '../routes'

// Constans ------------------------------>
const ENV = process.env.NODE_ENV || 'dev'
const FRONTEND_URL =
  ENV === 'dev'
    ? `http://localhost:3000`
    : 'https://macacoloucopizzaria.vercel.app'

// Initialize server ----------------------->
const app = express()
export const pusher = new Pusher({
  appId: process.env.PUSHER_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  useTLS: true,
})
const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
  },
})
io.on('connection', (socket: Socket) => {
  console.log('[CONNECTED] => ', socket.id)

  socket.on('disconnect', () => {
    console.log('[DISCONNECTED] => ', socket.id)
  })
})

// Config ----------------------->
app.use(express.json())
app.use(
  cors({
    origin: FRONTEND_URL,
  })
)
app.use(express.urlencoded({ extended: false }))
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_URL)
  next()
})

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
export default server
