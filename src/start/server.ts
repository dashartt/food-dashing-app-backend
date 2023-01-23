import 'dotenv/config'
import { connect as connectDb } from 'mongoose'
import app from './app'
import serverIo from '../start/io'

const appPort = parseInt(process.env.APP_PORT as string) || 3001
const socketPort = parseInt(process.env.SOCKET_PORT as string) || 3002
const mongoUrl = process.env.MONGO_URL || 'mongodb://172.17.0.2:27017/pizzaria'

connectDb(mongoUrl)
  .then(() => {
    console.log("\x1b[33m%s\x1b[0m', `=> 🚀 Database connected")

    app.listen(appPort, () => {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `=> Server running on the port: ${appPort}`
      )
    })

    serverIo.listen(socketPort, () =>
      console.log(
        '\x1b[33m%s\x1b[0m',
        `=> Socket-io running on the port: ${socketPort}`
      )
    )
  })
  .catch(() => {
    console.warn('Database and Server not connected')
  })
