import { Schema, model } from 'mongoose'
import { IITemCategory } from '../../types'

export const itemCategorySchema = new Schema<IITemCategory>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

itemCategorySchema.path('id')

const ItemCategoryModel = model<IITemCategory>(
  'ItemCategory',
  itemCategorySchema
)

export default ItemCategoryModel
