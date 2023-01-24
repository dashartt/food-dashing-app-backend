import { ObjectId } from 'mongodb'
import { Socket } from 'socket.io'
import app from './app'
import http from 'http'
import socketio from 'socket.io'

const server = http.createServer(app)

export const io = new socketio.Server(server, {
  cors: {
    origin: '*',
  },
})

export const notifyNewOrder = (orderId: ObjectId | string) => {
  io.emit('new-order', orderId)
}

io.on('connection', (socket: Socket) => {
  console.log('New client connected | id', socket.id)

  socket.on('ping', (msg) => {
    console.log(msg)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

export default server
