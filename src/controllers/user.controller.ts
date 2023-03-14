import { Request, Response } from 'express'
import * as userRepository from '../repositories/user.repository'
import { ICredential, IUser } from '../types/user.type'
import * as jwt from '../utils/auth'

export const signup = async (req: Request, res: Response) => {
  const user = req.body as IUser

  const response = await userRepository.signup(user)

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
        _id,
        addresses,
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

// export const validateToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers.authorization
//   const forward = req.headers['x-forward'] || 'false'

//   console.log(token)

//   if (!token || token === '') {
//     return res.status(403).json({
//       isSuccess: false,
//       message: 'Sem autorização para essa ação',
//     })
//   }

//   const response = jwt.validateToken(token)
//   console.log(response)

//   if (response?.data === null) {
//     return res.status(403).json({
//       isSuccess: false,
//       message: 'Sem autorização para essa ação',
//     })
//   }

//   if (forward === 'true') {
//     req.accessToken = response?.data
//     return next()
//   } else {
//     return res.status(200).json({
//       isSuccess: true,
//       message: 'Autorizado',
//     })
//   }
// }
