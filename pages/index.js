import React, { Component } from 'react'
import Layout from '../components/Layout'
import { withRouter} from 'next/router'
import { Icon, Toast } from 'antd-mobile'
import Link from 'next/link'
import IndexHeader from '../components/IndexHeader'
import IndexBanner from '../components/IndexBanner'
import NewList from '../components/NewList'
import { getLatest, getBeforeNews } from '../api'
import { getLastDay, debounce } from '../utils';

// Class组件
class Home extends Component {
	static async getInitialProps(){
		const res = await getLatest()
		console.log(res);
		return {
			data: {
				...res
			}
		}
	}

	state = {
		beforeList: [],
		loading: false,
		date: this.props.data.date
	}

	handleOnScroll =  (e) => {
		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
		if(scrollTop+windowHeight==scrollHeight){
			//console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
			//console.log(this.state);
			!this.state.loading && this.props.data && this.getData()
			
		}
	}

	async getData(){
		await this.setState({
			loading: true
		})

		const lastDay = getLastDay(this.state.date)
		const beforeNews = await getBeforeNews(lastDay)
		let prevBeforeList = this.state.beforeList
		if (lastDay != beforeNews.date ) {
			Toast.info('api请求次数已超出限制')
		} else {
			await this.setState({
				beforeList: prevBeforeList.concat(beforeNews),
				date: lastDay
			})
		}
		await this.setState({
			loading: false
		})
	}

	componentDidMount() {
		this.props.data && window.addEventListener('scroll', this.handleOnScroll, false)
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleOnScroll, false)
	}

	render() {
		const { data } = this.props
		const { beforeList, loading } = this.state
		return (
			<Layout title="知乎日报" mainClass="index">
				<IndexHeader date={data.date} />
				<div ref={dom => {this.dom = dom}} onScrollCapture={() => this.handleOnScroll()}>
					{
						data ?
						<>
							<IndexBanner list={data.top_stories} />
							<NewList list={data.stories}/>
							{
								beforeList.map(item => {
									return (
										<NewList list={item.stories} date={item.date} key={item.date} showDate={true}/>
									)
								})
							}
						</> :
						<div>NULL</div>
					}
					{
						loading && <div className="loading"><Icon type="loading" size='md' /></div>
					}
				</div>
			</Layout>
		)
	}
}

export default withRouter(Home)