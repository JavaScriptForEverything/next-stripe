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
