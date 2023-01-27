import { beamsClient } from '../config/server'

type StatusMessageMap = {
  [status: string]: string
}
const statusMessageMap: StatusMessageMap = {
  'in-progress': 'Começamos a preparar seu pedido',
  oven: 'Pedido levado ao forno',
  delivery: 'Saiu para entrega',
}

const getMessageByStatus = (status: string) => statusMessageMap[status]

export const notifyUpdateOrderStatus = (status: string, orderId: string) => {
  beamsClient
    .publishToInterests(['update-order-status'], {
      web: {
        notification: {
          title: `[Macaco Louco Pizzaria] Status do pedido`,
          body: getMessageByStatus(status),
          deep_link: `https://macacoloucopizzaria.vercel.app/order/${orderId}`,
        },
      },
    })
    .then((publishResponse) => {
      console.log('Just published:', publishResponse.publishId)
    })
    .catch((error) => {
      console.log('Error:', error)
    })
}

export const notifyNewOrder = () => {
  beamsClient
    .publishToInterests(['new-order'], {
      web: {
        notification: {
          title: `[Macaco Louco Pizzaria] Novo pedido!`,
          deep_link: `https://macacoloucopizzaria.vercel.app/admin/orders/to-do`,
        },
      },
    })
    .then((publishResponse) => {
      console.log('Just published:', publishResponse.publishId)
    })
    .catch((error) => {
      console.log('Error:', error)
    })
}
