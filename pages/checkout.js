import Link from 'next/link'
import { Stripe } from 'stripe'
import { parseCookies, setCookie } from 'nookies'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './checkoutForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)


const CheckoutPage = ({ paymentIntent }) => {
	// console.log(paymentIntent)
	return (
		<>
		<Elements stripe={stripePromise}>
			<CheckoutForm clientSecret={paymentIntent.client_secret} />
		</Elements>

		<Link href='/'><a>Home</a></Link>
		</>
	)
}
export default CheckoutPage




// ServerSide
export const getServerSideProps = async (ctx) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

	const { paymentIntentId } = parseCookies(ctx, 'paymentIntentId')
	let paymentIntent = ''

	console.log(ctx)

	if(paymentIntentId) {
		paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

	} else {
		paymentIntent = await stripe.paymentIntents.create({
			amount: 25000,
			currency: 'usd'
		})
		setCookie(ctx, 'paymentIntentId', paymentIntent.id)
	}


	return { props: { paymentIntent }}
}
