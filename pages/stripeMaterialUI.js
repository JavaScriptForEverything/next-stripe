import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Stepper from '../stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const StripeMaterialUI = () => {

	return (
		<Elements stripe={stripePromise} >
			<Stepper />
		</Elements>
	)
}
export default StripeMaterialUI
