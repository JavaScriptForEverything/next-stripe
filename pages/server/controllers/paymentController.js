import { Stripe } from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const createPaymentIntent = async (req, res, next) => {
	let { amount, currency } = req.body
	amount = amount * 100

	const	paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency,
	})

	res.status(200).json({
		status: 'success',
		clientSecret: paymentIntent.client_secret, 		// to confirm Payment on clientSide with @stripe/react-stripe-js
	})
}


