
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './checkoutFormIndex'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const Home = () => {

	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	)
}
export default Home




