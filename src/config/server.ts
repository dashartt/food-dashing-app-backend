import express, { Errback, NextFunction, Request, Response } from 'express'
import http from 'http'
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
const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
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
