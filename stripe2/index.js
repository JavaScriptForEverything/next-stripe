import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import { CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js'

import StepContent from './stepContent'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'


const StripeMaterialUI = () => {
	const stripe = useStripe()
	const elements = useElements()
	const [ activeStep, setActiveStape ] = useState(0)
	const [ loading, setLoading ] = useState(false)

	// console.log(activeStep)
	const router = useRouter()

	const nextHandler = () => {
		if(activeStep >= 3) return
		setActiveStape(step => step + 1)
	}
	const backHandler = () => {
		if(activeStep <= 0) return
		setActiveStape(step => step - 1)
		setLoading(false) 								// To reset to default
	}

	const submitHandler = async (evt) => {
		evt.preventDefault()

		if(activeStep !== 2) return nextHandler() 	// only handle payment form by this submitHandler
		if(!stripe || !elements) return

		setLoading(true)


		const { error, paymentMethod: { id } } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardNumberElement)
		})
		const { data : { clientSecret } } = await axios .post('/api/checkout/stripeMui', {
			id,
			amount: 44,
			currency: 'bdt'
		})

		if(error) return console.log(error)
		console.log(clientSecret)

		setActiveStape(step => step + 1)
		setLoading(false)
	}


	return (
		<>
		<Button onClick={() => router.push('/')} >Home</Button>

			<Stepper>
				{['Shipping', 'Details', 'Payment'].map(item => (
					<Step key={item}>
						<StepLabel>{item}</StepLabel>
					</Step>
				))}
			</Stepper>


			<form onSubmit={submitHandler}>
				<StepContent activeStep={activeStep} />


			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 6 }} >
				<Button onClick={backHandler} > Back </Button>
				<Button type='submit' variant='contained' disabled={loading} >
					{ activeStep === 2 ? loading ? <CircularProgress size={24} /> : 'Pay' : activeStep === 3 ? 'Success' : 'Next' }
				</Button>
			</Box>
			</form>
		</>
	)
}
export default StripeMaterialUI
