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

export const removeAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addressId = req.params.addressId || ''

  const isDeleted = await addressRepository.removeAddress(addressId)

  if (!isDeleted)
    return res
      .status(400)
      .json({ isSuccess: false, message: 'Erro ao excluir o endereço' })

  res.status(200).json({ isSuccess: true, message: 'Endereço excluido' })
}
