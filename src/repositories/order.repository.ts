import moment from 'moment'
import OrderModel from '../database/models/order.model'
import { IOrder, IOrderSearchParams } from '../types'

export const updateOrderStatus = async (_id: string, status: string) => {
  try {
    await OrderModel.updateOne(
      {
        _id,
      },
      {
        status,
      }
    )
    console.log("\x1b[33m%s\x1b[0m', `=> Update Order Status")
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> Update Order Status Error")
  }
}

export const getOrderById = async (shopId: string, orderId: string) =>
  OrderModel.findOne({
    $and: [{ _id: orderId }, { shopId }],
    // _id: orderId,
    // shopId,
  })
    .populate({
      path: 'clientId',
      select: 'fullName',
    })
    .populate([
      {
        path: 'orderItemsId',
        populate: {
          path: 'itemIds',
        },
      },
      {
        path: 'orderItemsId',
        populate: {
          path: 'additionalIds',
        },
      },
    ])
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })

export const getClientOrders = async (shopId: string, clientId: string) => {
  try {
    const orders = OrderModel.find({
      $and: [{ clientId }, { shopId }],
    })
      .populate({
        path: 'clientId',
      })
      .populate({
        path: 'addressId',
      })
      .populate([
        {
          path: 'orderItemsId',
          populate: {
            path: 'itemIds',
          },
        },
        {
          path: 'orderItemsId',
          populate: {
            path: 'additionalIds',
          },
        },
      ])
      .sort({
        createdAt: -1,
      })
    console.log("\x1b[33m%s\x1b[0m', `=> Get All Client Orders")
    return orders
  } catch (error) {
    console.warn("\x1b[33m%s\x1b[0m', `=> Get All Client Orders error")
    return []
  }
}

export const getShopOrders = async ({
  shopId,
  status = '',
  today = false,
}: IOrderSearchParams) => {
  const today_ = moment().startOf('day')

  return OrderModel.find({
    shopId,
    ...(today && {
      updatedAt: {
        $gte: today_.toDate(),
        $lt: moment(today_).endOf('day').toDate(),
      },
    }),
    ...(status != '' && { status }),
  })
    .populate({
      path: 'clientId',
      select: 'fullName',
    })
    .populate([
      {
        path: 'orderItemsId',
        populate: {
          path: 'itemIds',
        },
      },
      {
        path: 'orderItemsId',
        populate: {
          path: 'additionalIds',
        },
      },
    ])
    .sort({
      createdAt: -1,
    })
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })
}

export const addOrder = async (orderDTO: IOrder) =>
  OrderModel.create({
    ...orderDTO,
  })
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })
