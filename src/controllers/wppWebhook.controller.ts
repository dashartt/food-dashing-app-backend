import axios from 'axios'
import { Request, Response } from 'express'

const token = process.env.WHATSAPP_TOKEN

export const getWebhook = (req: Request, res: Response) => {
  const verify_token = process.env.VERIFY_TOKEN

  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED')
      res.status(200).send(challenge)
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403)
    }
  }
}

export const postWebhook = async (req: Request, res: Response) => {
  // Parse the request body from the POST
  const body = req.body

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body.entry[0].changes[0].value, null, 2))

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    // if (
    //   req.body.entry &&
    //   req.body.entry[0].changes &&
    //   req.body.entry[0].changes[0] &&
    //   req.body.entry[0].changes[0].value.messages &&
    //   req.body.entry[0].changes[0].value.messages[0] &&
    //   req.body.entry[0].changes[0].value.metadata
    // ) {
    //   const response = req.body.entry[0].changes[0].value
    //   let phone_number_id = response.metadata.phone_number_id
    //   let from = response.messages[0].from // extract the phone number from the webhook payload
    //   let msg_body = response.messages[0].text.body // extract the message text from the webhook payload

    //   const i = contactHandler.some((a) => a.initialized)
    //   if (!i) {
    //     contactHandler.push({ phoneId: phone_number_id, initialized: true })
    //     await axios({
    //       method: 'POST',
    //       url: `https://graph.facebook.com/v15.0/${phone_number_id}/messages`,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //       data: {
    //         messaging_product: 'whatsapp',
    //         to: from,
    //         type: 'template',
    //         template: {
    //           name: 'firstmessage',
    //           language: { code: 'pt_BR' },
    //         },
    //       },
    //     })
    //   }
    // }
    // if (
    //   req.body.entry &&
    //   req.body.entry[0].changes &&
    //   req.body.entry[0].changes[0] &&
    //   req.body.entry[0].changes[0].value &&
    //   req.body.entry[0].changes[0].value.statuses &&
    //   req.body.entry[0].changes[0].value.statuses[0]
    // ) {
    //   console.log(
    //     req.body.entry[0].changes[0].value.statuses[0].conversation.origin.type
    //   )
    // }
    res.sendStatus(200)
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404)
  }
}
