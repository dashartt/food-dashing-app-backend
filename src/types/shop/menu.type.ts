import type { IUuid } from '..'

export type IItemCategory = IUuid & {
  name: string
  allowObservation: boolean
  allowHalf: boolean
  allowAdditional: boolean
}

export type IMenuItem = IUuid & {
  category: Partial<IItemCategory>
  name: string
  price: number
  ingredients?: string
}

export type IAdditional = IUuid & {
  categories: Partial<IItemCategory[]>
  name: string
  price: number
}
