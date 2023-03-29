import 'dotenv/config'
import server from './config/server'
import database from './config/database'

const PORT = parseInt(process.env.PORT as string) as number

database
  .then(() => {
    console.log(`\n\n=======> Database connected\n\n`)

    server.listen(PORT, () => {
      console.log(`=======> Server running on the port: ${PORT}\n\n`)
    })
  })
  .catch((error) => {
    console.log(error, '\n\n')
    console.log(`=======> Database not connected\n\n`)
    console.log(`=======> Server will close\n\n`)
    process.exit(1)
  })

export default server
