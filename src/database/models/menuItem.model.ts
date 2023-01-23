import { Schema, model } from 'mongoose'
import { IMenuItem } from '../../types'

export const menuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: String, required: false },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ItemCategory',
    },
  },
  {
    timestamps: true,
  }
)

menuItemSchema.path('id')

const MenuItemModel = model<IMenuItem>('MenuItem', menuItemSchema)

export default MenuItemModel
