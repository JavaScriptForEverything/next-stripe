import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import StripeInput from '../stripe/stripeInput'

import TextField from '@mui/material/TextField'



const cardItems = [
	{ label: 'Card Number', component: CardNumberElement },
	{ label: 'Expiration Date', component: CardExpiryElement },
	{ label: 'CVC', component: CardCvcElement }
]


const PaymentForm = () => {

	return (
		<>
		{cardItems.map(({label, component}, key) => <TextField key={key}
				fullWidth
				InputProps={{
					inputProps: { component },
					inputComponent: StripeInput
				}}
			/>
			)}
		</>
	)
}
export default PaymentForm

