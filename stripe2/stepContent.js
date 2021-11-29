import PaymentForm from './paymentForm'

const StepContent = ({ activeStep }) => {

	switch(activeStep) {
		case 0: return 'shipping'
		case 1: return 'details'
		case 2: return <PaymentForm />
		case 3: return 'success'

		default: return ''
	}

}
export default StepContent
