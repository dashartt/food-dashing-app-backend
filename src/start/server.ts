import 'dotenv/config'
import app from './app'
import serverIo from '../start/io'
import mongodb from './database'

const appPort = parseInt(process.env.PORT as string) as number
const socketPort = parseInt(process.env.SOCKET_PORT as string) as number

app.listen(appPort, '0.0.0.0', () => {
  console.log('\x1b[33m%s\x1b[0m', `=> Server running on the port: ${appPort}`)
})

serverIo.listen(socketPort, () =>
  console.log(
    '\x1b[33m%s\x1b[0m',
    `=> Socket-io running on the port: ${socketPort}`
  )
)

mongodb
  .then(() => {
    console.log('\x1b[33m%s\x1b[0m', `=> Database connected`)
  })
  .catch(() => {
    console.log('\x1b[33m%s\x1b[0m', `=> Database not connected`)
    console.log('\x1b[33m%s\x1b[0m', `=> Server and socket io will close`)
    process.exit(0)
  })
