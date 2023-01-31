import { sign, verify } from 'jsonwebtoken'
import { IAccessToken, IAccount, IToken } from '../types'

const JWT_KEY = process.env.JWT_KEY as string

export const createToken = (account: Omit<IAccount, 'password'>) => {
  return sign({ account }, JWT_KEY, {
    expiresIn: '8h',
  })
}

export const validateToken = (token: string = '') => {
  if (!token)
    return {
      data: null,
    }
  // throw new CustomError('UnauthorizedError', 'Token must be a valid token')
  try {
    const data = verify(token, JWT_KEY)

    return {
      data: data as IAccessToken,
    }
  } catch (error) {
    if (error) {
      return {
        data: null,
      }
      // throw new CustomError('UnauthorizedError', 'Token must be a valid token')
    }
  }
}
