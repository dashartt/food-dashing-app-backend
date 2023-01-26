import { ServerApiVersion } from 'mongodb'
import { connect } from 'mongoose'

const MONGO_URL =
  process.env.MONGO_URL ||
  'mongodb+srv://dashart:7CB19066@cluster0.bhvn9ws.mongodb.net/?retryWrites=true&w=majority'

const mongodb = connect(MONGO_URL, {
  serverApi: ServerApiVersion.v1,
})

export default mongodb
