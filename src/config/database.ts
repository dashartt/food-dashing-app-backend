import { ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL as string

mongoose.set('strictQuery', false)

const mongodb = mongoose.connect(MONGO_URL, {
  serverApi: ServerApiVersion.v1,
})

export default mongodb
