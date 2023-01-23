import ClientModel from '../database/models/client.model'
import { IClient } from '../types'

export const addClient = async (clientDTO: IClient) => {
  try {
    const newClient = await ClientModel.create({
      ...clientDTO,
    })
    console.log("\x1b[33m%s\x1b[0m', `=> 🚀 New Client inserted")
    return newClient._id
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> 🚀 New Client not inserted")
    return null
  }
}
