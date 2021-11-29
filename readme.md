### Stripe payment method are 2 ways: (I only know it)

- Pre-build : Checkout
- Custom : PaymentIntents : PaymentIntents also 2 ways
		.createPaymentMethod({card: elements.getElement(CardElement)})
		. confirmCardPayment(client_secret,
			{ payment_method: {
				card: elements.getElement(CardElement)
			}
		})

<img
	width = "100%"
	src="https://github.com/JavaScriptForEverything/next-stripe/blob/master/public/BannerForGit_Stripe-MaterialUI.png?raw=true"
	alt="My Profile Picture"
/>
<br />



###### Method-1: Back-End
<hr />

```
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) 	// work on NextJS too

export const createPaymentIntentMui = async (req, res, next) => {
	let { id, amount, currency } = req.body
	amount = amount * 100

	const	paymentIntent = await stripe.paymentIntents.create({
		payment_method: id,
		confirm: true,
		amount,
		currency,
	})

	res.status(200).json({
		status: 'success',
		clientSecret: paymentIntent.client_secret, 		// to confirm Payment on clientSide with @stripe/react-stripe-js
	})
}
```
<br />


###### Method-1: Font-End
<hr />
```
const { error, paymentMethod: { id } } = await stripe.createPaymentMethod({
	type: 'card',
	card: elements.getElement(CardNumberElement)
})
const { data : { clientSecret } } = await axios .post('/api/checkout/stripeMui', {
	id,
	amount: 44,
	currency: 'bdt'
})
```
<br />
<br />




###### Method-2: Back-End
<hr />

```
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
```
<br />

###### Method-2: Font-End
<hr />
```
const { data : { clientSecret } } = await axios.post('/api/checkout/stripeBasic', {
	amount: 44,
	currency: 'bdt'
})

const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
	payment_method: {
		card: elements.getElement(CardNumberElement)
	}
})
```
