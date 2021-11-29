import Link from 'next/link'
import Typography	from '@mui/material/Typography'

const Home = () => {

	return (
		<Typography variant='body1'>
			<ul>
				<li><Link href="/stripeServerSideProps"><a>Method-1: Stripe serverSideProps</a></Link></li>
				<li><Link href="/stripeBasic"><a>Method-2: Stripe Basic</a></Link></li>
				<li><Link href="/stripeMaterialUI"><a>Method-2: Stripe_MUI [ confirmCardPayment() ]</a></Link></li>
				<li><Link href="/stripeMui"><a>Method-3: Stripe_MUI [ createPaymentMethod() ]</a></Link></li>
			</ul>

			<h6>In Method-3: I only simple changes all code is same as Method-2 </h6>
			<ul>
				<li>/stripe2/index.js</li>
				<li>/pages/api/checkout/stripeMui.js</li>
				<li>/server/controller/paymentController.js</li>
			</ul>
		</Typography>
	)
}
export default Home




