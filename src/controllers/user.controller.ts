import { Request, Response } from 'express'
import { ObjectId } from 'mongoose'
import * as userRepository from '../repositories/user.repository'
import { IAddress } from '../types/address.type'
import { ICredential, IUser } from '../types/user.type'
import * as jwt from '../utils/auth'

export const signup = async (req: Request, res: Response) => {
  const user = req.body as IUser

  const response = await userRepository.signup(user)

  console.log(response)

  if (!response.data)
    return res
      .status(400)
      .json({ message: 'Erro ao criar a conta', data: null })

  return res.status(201).json({
    message: 'Conta criada com sucesso',
    data: response.data,
  })
}

export const signin = async (req: Request, res: Response) => {
  const user = req.body as ICredential

  const response = await userRepository.signin(user)

  console.log(response)

  if (!response.data)
    return res
      .status(400)
      .json({ message: 'Email e/ou senha incorreta', data: null })

  const token = jwt.createToken(response.data)
  const { _id, fullName, email, role, addresses } = response.data

  return res.status(200).json({
    data: {
      token,
      user: {
        fullName,
        email,
        role,
        addresses,
        _id,
      },
    },
    message: 'Autenticado com sucesso',
  })
}

// export const updateAccount = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const details = req.body as IAccount

//   const accountId = await authRepository.updateAccount(details)

//   res.status(200).json({
//     isSuccess: true,
//     message: 'Informações atualizadas com sucesso',
//     data: {
//       accountId,
//     },
//   })
// }

export const verifyAuth = (req: Request, res: Response) => {
  const token = req.headers.authorization as string

  const response = jwt.validateToken(token)
  const hasAuth = !!response.data

  return res.status(hasAuth ? 200 : 403).json({
    data: { hasAuth },
    message: hasAuth ? 'Autorizado' : 'Não autorizado',
  })
}

export const addAddress = async (req: Request, res: Response) => {
  const userId = req.params.userId as unknown as ObjectId
  const addresses = req.body as IAddress[]

  const response = await userRepository.update(userId, {
    addresses,
  })
  if (!response.data) {
    return res.status(400).json({
      data: null,
      message: 'Erro ao adicionar novo endereço',
    })
  }
  return res.status(201).json({
    data: response.data.addresses,
    message: 'Sucesso ao adicionar o novo endereço',
  })
}
