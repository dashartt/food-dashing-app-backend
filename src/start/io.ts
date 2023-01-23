import { ObjectId } from 'mongodb'
import { Socket } from 'socket.io'

const app = require('./app')
const http = require('http')
const socketIo = require('socket.io')
const server = http.createServer(app)

export const io: Socket = socketIo(server, {
  cors: {
    origin: '*',
  },
})

export const notifyNewOrder = (orderId: ObjectId | string) => {
  io.emit('new-order', orderId)
}

io.on('connection', (socket: Socket) => {
  console.log('New client connected | id', socket.id)

  socket.on('frontend-msg', (msg) => {
    console.log(msg)
  })
  socket.emit('backend-msg', 'backend-ping')

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

export default server
