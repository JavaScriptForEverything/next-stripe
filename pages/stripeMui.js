import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Stepper from '../stripe2'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const StripeMui = () => {

	return (
		<Elements stripe={stripePromise} >
			<Stepper />
		</Elements>
	)
}
export default StripeMui
