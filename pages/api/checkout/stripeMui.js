import { createPaymentIntentMui } from '../../../server/controllers/paymentController'
import nc from 'next-connect'

const handler = nc()

handler.post(createPaymentIntentMui)

export default handler
