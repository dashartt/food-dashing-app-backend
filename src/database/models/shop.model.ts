import { Schema, model } from 'mongoose'

import { IShopSettings } from '../../types/shop/settings.type'

export const shopSchema = new Schema<IShopSettings>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  shopName: { type: String },
  shopAddress: { type: Schema.Types.ObjectId, ref: 'Address' },
  shopOpeningHours: {
    daysOfWeek: [{ label: { type: String }, value: { type: String } }],
    hours: { starts: { type: String }, ends: { type: String } },
  },
  deliveryFees: [{ upToKm: { type: Number }, price: { type: Number } }],
  categories: [
    {
      name: { type: String },
      allowObservation: { type: Boolean, default: false },
      allowHalf: { type: Boolean, default: false },
      allowAdditional: { type: Boolean, default: false },
    },
  ],
  items: [
    {
      category: {
        name: { type: String },
        allowObservation: { type: Boolean, default: false },
        allowHalf: { type: Boolean, default: false },
        allowAdditional: { type: Boolean, default: false },
      },
      name: { type: String },
      price: { type: Number },
      ingredients: { type: String, required: false },
    },
  ],
  additional: [
    {
      categories: [
        {
          name: { type: String },
          allowObservation: { type: Boolean, default: false },
          allowHalf: { type: Boolean, default: false },
          allowAdditional: { type: Boolean, default: false },
        },
      ],
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],
})

const ShopModel = model<IShopSettings>('Shop', shopSchema)

export default ShopModel
