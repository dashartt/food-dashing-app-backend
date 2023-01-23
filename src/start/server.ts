import 'dotenv/config'
import { connect as connectDb } from 'mongoose'
// import app from './app'
import expressWithSocket from '../start/io'

const PORT = parseInt(process.env.PORT as string) as number
const MONGO_UL = process.env.MONGO_URL as string

expressWithSocket.listen(PORT, '0.0.0.0', () => {
  console.log(
    '\x1b[33m%s\x1b[0m',
    `=> Server and SocketIO running on the port: ${PORT}`
  )
})

// serverIo.listen(PORT, () =>
//   console.log('\x1b[33m%s\x1b[0m', `=> Socket-io running on the port: ${PORT}`)
// )

connectDb(MONGO_UL)
  .then(() => console.log('\x1b[33m%s\x1b[0m', `=> Database connected`))
  .catch(() => {
    console.log('\x1b[33m%s\x1b[0m', `=> Database not connected`)
    console.log('\x1b[33m%s\x1b[0m', `=> Server and socket io will close`)
    process.exit(0)
  })
