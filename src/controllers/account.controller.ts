import { NextFunction, Request, Response } from 'express'
import * as authRepository from '../repositories/account.repositories'
import { IAccount } from '../types'
import * as jwt from '../utils/auth'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const account = req.body as IAccount

  const response = await authRepository.registerAccount(account)

  if (!response.data)
    return res
      .status(400)
      .json({ isSuccess: false, message: 'Erro ao criar a conta' })

  return res
    .status(201)
    .json({ isSuccess: true, message: 'Conta criada com sucesso' })
}

export const getAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const password = req.body as Omit<IAccount, 'role'>

  const response = await authRepository.authAccount(password)

  if (!response.data)
    return res
      .status(400)
      .json({ isSuccess: false, message: 'Senha incorreta' })

  const token = jwt.createToken(response.data)

  return res.status(200).json({
    isSuccess: true,
    data: {
      token,
      fullName: response.data.fullName,
    },
    message: 'Autenticado com sucesso',
  })
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
  const forward = req.headers['x-forward']

  const response = jwt.validateToken(token)

  if (response?.data === null) {
    return res.status(403).json({
      isSuccess: false,
      message: 'Sem autorização para essa ação',
    })
  }

  if (forward === 'true') {
    req.accessToken = response?.data
    return next()
  } else {
    return res.status(200).json({
      isSuccess: true,
      message: 'Autorizado',
    })
  }
}
