import { Schema, model } from 'mongoose'
import { IOrderItem } from '../../types'

export const orderItemsSchema = new Schema<IOrderItem>(
  {
    itemIds: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
    quantity: { type: Number, required: true },
    observation: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

orderItemsSchema.path('id')

const OrderItemsModel = model<IOrderItem>('OrderItems', orderItemsSchema)

export default OrderItemsModel
