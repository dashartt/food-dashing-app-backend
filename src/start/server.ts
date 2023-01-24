import 'dotenv/config'
import serverWithSocket from '../start/io'
import mongodb from './database'

const port = parseInt(process.env.PORT as string) as number

serverWithSocket.listen(port, () => {
  console.log(
    '\x1b[33m%s\x1b[0m',
    `=> Server and Socket-io running on the port: ${port}`
  )
  const host = serverWithSocket.address().address
  const port_ = serverWithSocket.address().port
  console.log(host, ':', port_)
})

mongodb
  .then(() => {
    console.log('\x1b[33m%s\x1b[0m', `=> Database connected`)
  })
  .catch((error) => {
    console.log('\x1b[33m%s\x1b[0m', error)

    console.log('\x1b[33m%s\x1b[0m', `=> Database not connected`)
    console.log('\x1b[33m%s\x1b[0m', `=> Server and socket io will close`)
    process.exit(0)
  })
