import mongoose, { model } from 'mongoose'
import { IOrder } from '../../types/shop/order.type'

import { orderSchema } from '../schemas'

const AutoIncrement = require('mongoose-sequence')(mongoose)

orderSchema.plugin(AutoIncrement, { inc_field: 'orderCount', id: 'order_seq' })

const OrderModel = model<IOrder>('Order', orderSchema)

export default OrderModel
