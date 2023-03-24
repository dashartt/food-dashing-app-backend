import { IUuid } from '.'
import { IAddress } from './address.type'

export type ICredential = {
  email: string
  password: string
  role: 'customer' | 'admin' | 'deliveryman'
}

export type IUser = IUuid &
  ICredential & {
    fullName: string
    shopId?: string
    addresses?: IAddress[]
  }
