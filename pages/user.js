import Layout from '../components/Layout'
import Link from 'next/link'
import { withRouter} from 'next/router'


const Details = ({ router, data, extraInfo }) => {
	
	return (
		<Layout mainClass="user">
			user
		</Layout>
	)
  
}

Details.getInitialProps = async ( router )=>{
	return {
	}
}

export default withRouter(Details)
