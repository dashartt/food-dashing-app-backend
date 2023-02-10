import { NextFunction, Request, Response } from 'express'
import * as authRepository from '../repositories/account.repositories'

import { IAccount, ICredentials } from '../types'
import * as jwt from '../utils/auth'

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const account = req.body as IAccount

  const response = await authRepository.signup(account)

  if (!response.data)
    return res
      .status(400)
      .json({ isSuccess: false, message: 'Erro ao criar a conta' })

  return res
    .status(201)
    .json({ isSuccess: true, message: 'Conta criada com sucesso' })
}

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers)

  const account = req.body as ICredentials

  const response = await authRepository.signin(account)
  console.log(response)

  if (!response.data)
    return res
      .status(400)
      .json({ isSuccess: false, message: 'Celular ou senha incorreto' })

  const token = jwt.createToken(response.data)
  const { phone, _id, fullName, role } = response.data

  return res.status(200).json({
    isSuccess: true,
    data: {
      token,
      session: {
        fullName,
        role,
        _id,
        phone,
      },
    },
    message: 'Autenticado com sucesso',
  })
}

export const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const details = req.body as IAccount

  const accountId = await authRepository.updateAccount(details)

  res.status(200).json({ accountId })
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
  const forward = req.headers['x-forward'] || 'false'

  console.log(token)

  if (!token || token === '') {
    return res.status(403).json({
      isSuccess: false,
      message: 'Sem autorização para essa ação',
    })
  }

  const response = jwt.validateToken(token)
  console.log(response)

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
