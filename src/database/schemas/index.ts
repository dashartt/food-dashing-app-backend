import { Schema } from 'mongoose'
import { IAddress } from '../../types/address.type'
import {
  IAdditional,
  IItemCategory,
  IMenuItem,
} from '../../types/shop/menu.type'
import { IOrder, IOrderItem } from '../../types/shop/order.type'
import { IShopSettings } from '../../types/shop/settings.type'
import { IUser } from '../../types/user.type'

export const addressSchema = new Schema<IAddress>({
  lat: { type: Number },
  lon: { type: Number },
  place_id: { type: String },
  street: { type: String },
  housenumber: { type: String },
  complement: { type: String, required: false },
  suburb: { type: String },
  referencePoint: { type: String, required: false },
  state_code: { type: String },
  postcode: { type: String },
  city: { type: String },
  country: { type: String },
})
// -----------------------------------------
export const shopSchema = new Schema<IShopSettings>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  shopName: { type: String },
  shopAddress: { type: addressSchema },
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

// ------------------------------------------
export const userSchema = new Schema<IUser>({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  addresses: [{ type: addressSchema, required: false }],
})

export const categorySchema = new Schema<IItemCategory>({
  name: { type: String },
  allowAdditional: { type: Boolean },
  allowHalf: { type: Boolean },
  allowObservation: { type: Boolean },
})

export const additionalSchema = new Schema<IAdditional>({
  name: { type: String },
  price: { type: Number },
  categories: [{ type: categorySchema }],
})

export const menuItemSchema = new Schema<IMenuItem>({
  name: { type: String },
  price: { type: Number },
  ingredients: { type: String, required: false },
  category: { type: categorySchema },
})
// ------------------------------------------

export const orderItemsSchema = new Schema<IOrderItem>({
  item: [{ type: menuItemSchema }],
  quantity: { type: Number },
  observation: { type: String, required: false },
  borderType: { type: String, required: false },
  additional: [{ type: additionalSchema, required: false }],
})

export const orderSchema = new Schema<IOrder>(
  {
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    status: { type: String, default: 'to-do' },
    address: { type: addressSchema },
    items: [{ type: orderItemsSchema }],
    isDelivery: { type: Boolean },
    paymentType: { type: String },
    payback: { type: Number, required: false },
    orderCount: { type: Number },
  },
  {
    timestamps: true,
  }
)
