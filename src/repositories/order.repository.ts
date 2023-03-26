import moment from 'moment'
import { ObjectId } from 'mongoose'
import OrderModel from '../database/models/order.model'
import { IOrderSearchParams } from '../types'
import { IOrder } from '../types/shop/order.type'

export const updateOrderStatus = async (_id: string, status: string) =>
  OrderModel.updateOne({ _id }, { status })

export const getOrderById = async (shopId: ObjectId, orderId: ObjectId) =>
  OrderModel.findOne({
    $and: [{ _id: orderId, shop: shopId }],
  })
    .populate({
      path: 'client',
      select: 'fullName',
    })
    // .populate([
    //   {
    //     path: 'orderItemsId',
    //     populate: {
    //       path: 'itemIds',
    //     },
    //   },
    //   {
    //     path: 'orderItemsId',
    //     populate: {
    //       path: 'additionalIds',
    //     },
    //   },
    // ])
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })

export const getClientOrders = async (shopId: ObjectId, clientId: ObjectId) =>
  OrderModel.find({
    $and: [{ client: clientId }, { shop: shopId }],
  })
    .populate({
      path: 'client',
      select: 'fullName',
    })
    // .populate({
    //   path: 'addressId',
    // })
    // .populate([
    //   {
    //     path: 'orderItemsId',
    //     populate: {
    //       path: 'itemIds',
    //     },
    //   },
    //   {
    //     path: 'orderItemsId',
    //     populate: {
    //       path: 'additionalIds',
    //     },
    //   },
    // ])
    .sort({
      createdAt: -1,
    })
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })

export const getShopOrders = async ({
  shopId,
  status = '',
  today = false,
}: IOrderSearchParams) => {
  const today_ = moment().startOf('day')

  return (
    OrderModel.find({
      shop: shopId,
      ...(today && {
        updatedAt: {
          $gte: today_.toDate(),
          $lt: moment(today_).endOf('day').toDate(),
        },
      }),
      ...(status != '' && { status }),
    })
      .populate({
        path: 'client',
        select: 'fullName',
      })
      // .populate([
      //   {
      //     path: 'orderItemsId',
      //     populate: {
      //       path: 'itemIds',
      //     },
      //   },
      //   {
      //     path: 'orderItemsId',
      //     populate: {
      //       path: 'additionalIds',
      //     },
      //   },
      // ])
      .sort({
        createdAt: -1,
      })
      .then((data) => ({ data }))
      .catch((error) => {
        console.log(error)
        return { data: null }
      })
  )
}

export const addOrder = async (values: IOrder) =>
  OrderModel.create({
    shop: values.shop._id,
    client: values.client._id,
    address: values.address,
    status: values.status,
    isDelivery: values.isDelivery,
    items: values.items,
    paymentType: values.paymentType,
    ...(values.payback && { payback: values.payback }),
  })
    .then((data) => ({ data }))
    .catch((error) => {
      console.log(error)
      return { data: null }
    })
