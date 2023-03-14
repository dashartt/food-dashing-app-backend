import { sign, verify } from 'jsonwebtoken'
import { IAccessToken } from '../types'
import { IUser } from '../types/user.type'

const JWT_KEY = process.env.JWT_KEY as string

export const createToken = (account: Omit<IUser, 'password'>) => {
  return sign({ account }, JWT_KEY, { expiresIn: 0 })
}

export const validateToken = (token: string = '') => {
  if (!token) return { data: null }

  try {
    const data = verify(token, JWT_KEY)
    return { data: data as IAccessToken }
  } catch (error) {
    return { data: null }
  }
}
