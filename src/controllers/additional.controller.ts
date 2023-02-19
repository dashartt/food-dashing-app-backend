import { NextFunction, Request, Response } from 'express'
import * as additionalRepository from '../repositories/additional.repositories'
import { IAdditional } from '../types'

export const addAdditional = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const details = req.body as IAdditional

  const additional = await additionalRepository.addAdditional(details)

  res.status(200).json({
    isSuccess: true,
    message: 'Adicional adicionado com sucesso',
    data: {
      additional,
    },
  })
}
