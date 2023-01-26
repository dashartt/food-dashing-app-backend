import 'dotenv/config'
import server from './config/server'
import database from './config/database'

const PORT = parseInt(process.env.PORT as string) as number

database
  .then(() => {
    console.log('\x1b[33m%s\x1b[0m', `=> Database connected`)

    server.listen(PORT, () => {
      console.log('\x1b[33m%s\x1b[0m', `=> Server running on the port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('\x1b[33m%s\x1b[0m', error)
    console.log('\x1b[33m%s\x1b[0m', `=> Database not connected`)
    console.log('\x1b[33m%s\x1b[0m', `=> Server will close`)
    process.exit(1)
  })
