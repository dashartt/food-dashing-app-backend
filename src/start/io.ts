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
  console.log('[EMIT] => NEW ORDER', orderId)
}

export const notifyUpdateOrderStatus = (orderId: string, status: string) => {
  io.emit('update-status-order', status)
  console.log('[EMIT] => UPDATE STATUS ORDER', orderId)
}

io.on('connection', (socket: Socket) => {
  console.log('[CONNECTED] => ', socket.id)

  socket.on('disconnect', () => {
    console.log('[DISCONNECTED] => ', socket.id)
  })
})

export default server
