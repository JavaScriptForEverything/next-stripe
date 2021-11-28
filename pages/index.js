import Link from 'next/link'

const Home = () => {

	return (
		<>
			<ul>
				<li><Link href="/stripeBasic"><a>Stripe Basic</a></Link></li>
				<li><Link href="/stripeServerSideProps"><a>Stripe serverSideProps</a></Link></li>
			</ul>
		</>
	)
}
export default Home




