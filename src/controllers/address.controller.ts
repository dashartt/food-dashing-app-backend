import { NextFunction, Request, Response } from 'express'
import * as addressRepository from '../repositories/address.repositories'
import { IAddress } from '../types'

export const addAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newAddress = req.body as IAddress

  const addressId = await addressRepository.addAddress(newAddress)

  res.status(200).json({ addressId })
}
