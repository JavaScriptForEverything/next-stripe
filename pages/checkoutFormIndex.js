import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import axios from 'axios'

const CheckoutForm = () => {
	const stripe = useStripe()
	const elements = useElements()

	const [ disable, setDisable ] = useState(false)

	const submitHandler = async(evt) => {
		evt.preventDefault()
		if(!stripe || !elements) return
		setDisable(true)


		try{
			const { data: { clientSecret } } = await axios.post('/api/checkout', {
				amount: 555,
				currency: 'bdt',
			})

			const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardNumberElement)
				}
			})

			if(error) throw Error(error.message)
			if(paymentIntent.status !== 'succeeded') return console.log(paymentIntentId.status)


			// set Success alert
			console.log('Payment is complete')
			console.log(paymentIntent)
			setDisable(false)


		} catch (err) {
			console.log(err)
		}

	}

	return (
		<form onSubmit={submitHandler}>
			<CardNumberElement />
			<CardExpiryElement />
			<CardCvcElement />

			<button type='submit' disabled={disable}>
				{disable ? 'loading...' : 'Pay Now'}
			</button>
		</form>
	)
}

export default CheckoutForm
