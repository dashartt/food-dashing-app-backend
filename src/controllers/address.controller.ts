import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import * as addressRepository from '../repositories/address.repositories'
import { IAddress } from '../types/address.type'

export const addAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const address = req.body as IAddress

  const repository = await addressRepository.addAddress(address)
  if (req.isForward) {
    req.addressId = repository.data?._id as unknown as ObjectId
    return next()
  }
  res
    .status(200)
    .json({ data: repository.data, message: 'Endereço cadastrado' })
}

export const findAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const address = req.body as IAddress

  const repository = await addressRepository.findAddress(address)

  if (!repository.data) {
    return res.status(404).json({
      message: 'Endereço não encontrado',
      data: null,
    })
  }

  res
    .status(200)
    .json({ data: repository.data, message: 'Endereço encontrado' })
}
// export const updateAddress = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const updateAddress = req.body as IAddress
//   const addressId = req.params.addressId as unknown as ObjectId

//   const isUpdated = await addressRepository.updateAddress({
//     _id: addressId,
//     ...updateAddress,
//   })

//   if (!isUpdated)
//     return res
//       .status(400)
//       .json({ isSuccess: false, message: 'Erro ao atualizar o endereço' })

//   res.status(200).json({ isSuccess: true, message: 'Endereço atualizado' })
// }

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
