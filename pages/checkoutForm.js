import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { destroyCookie } from 'nookies'
import { useState } from 'react'

const CheckoutForm = ({ clientSecret }) => {
	const stripe = useStripe()
	const elements = useElements()

	const [ disable, setDisable ] = useState(false)

	const submitHandler = async(evt) => {
		evt.preventDefault()
		if(!stripe || !elements) return

		setDisable(true)

		try{
			// client_secret which comes from backend req, not the publishable_Key
			const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardNumberElement)
				}
			})

			if(error) throw Error(error.message)
			if(paymentIntent.status !== 'succeeded') return console.log(paymentIntentId.status)

			// if success then we have to remove paymentIntentId from cookie, because one id only allow one payment
			destroyCookie(null, 'paymentIntentId')

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
