import { NextFunction, Request, Response } from 'express'
import * as clientRepository from '../repositories/client.repositories'
import { IClient } from '../types'

export const addClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newClient = req.body as IClient

  const clientId = await clientRepository.addClient(newClient)

  res.status(200).json({ clientId })
}
