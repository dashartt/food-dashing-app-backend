import mongoose, { Schema, model } from 'mongoose'
import { IOrder } from '../../types'

const AutoIncrement = require('mongoose-sequence')(mongoose)

export const orderSchema = new Schema<IOrder>(
  {
    shopId: { type: Schema.Types.ObjectId, ref: 'Shop' },
    clientId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'to-do' },
    orderCount: { type: Number },
    addressId: { type: Schema.Types.ObjectId, ref: 'Address' },
    orderItemsId: [{ type: Schema.Types.ObjectId, ref: 'OrderItems' }],
    isDelivery: { type: Boolean },
    paymentType: { type: String },
    payback: { type: Number },
  },
  {
    timestamps: true,
  }
)

orderSchema.plugin(AutoIncrement, { inc_field: 'orderCount', id: 'order_seq' })

const OrderModel = model<IOrder>('Order', orderSchema)

export default OrderModel
