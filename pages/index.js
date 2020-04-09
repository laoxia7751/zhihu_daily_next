import Layout from '../components/Layout'
import { withRouter} from 'next/router'
import { Button } from 'antd-mobile'
import Link from 'next/link'
import IndexHeader from '../components/IndexHeader'
import IndexBanner from '../components/IndexBanner'
import NewList from '../components/NewList'
import { getLatest  } from '../api'

const Home = ({ data }) => {
	return (
		<Layout title="知乎日报" mainClass="index">
			<IndexHeader date={data.date} />
			{
				data ?
				<>
					<IndexBanner list={data.top_stories} />
					<NewList list={data.stories}/>
				</> :
				<div>NULL</div>
			}
			
  		</Layout>
	)
	
}

Home.getInitialProps = async ()=>{
	const res = await getLatest()
	console.log(res.data);
    return {
		data: {
			...res.data
		}
	}
}

export default withRouter(Home)