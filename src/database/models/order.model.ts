import mongoose, { Schema, model } from 'mongoose'
import { IOrder } from '../../types'

const AutoIncrement = require('mongoose-sequence')(mongoose)

export const orderSchema = new Schema<IOrder>(
  {
    status: { type: String, default: 'to-do' },
    orderCount: { type: Number },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    addressId: { type: Schema.Types.ObjectId, ref: 'Address' },
    orderItemsId: [{ type: Schema.Types.ObjectId, ref: 'OrderItems' }],
    paymentType: { type: String },
    payback: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
)

orderSchema.plugin(AutoIncrement, { inc_field: 'orderCount', id: 'order_seq' })
orderSchema.path('id')

const OrderModel = model<IOrder>('Order', orderSchema)

export default OrderModel
