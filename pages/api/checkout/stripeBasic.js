import { createPaymentIntent } from '../../../server/controllers/paymentController'
import nc from 'next-connect'

const handler = nc()

handler.post(createPaymentIntent)

export default handler
