import Layout from '../components/Layout'
import Link from 'next/link'
import { withRouter} from 'next/router'
import { getNewsDetails, getNewsExtra } from '../api'
import { getRgbColor } from '../utils'

const Details = ({ router, data, extraInfo }) => {
	function toComments(){
		router.push({
			pathname: '/comments',
			query: {
				id: router.query.id
			}
		})
	}
	return (
		<Layout title={data.title} mainClass="details">
			<div className="poster">
				<img className="img" src={data.image.replace('https','http')}/>
				<div className="img_info" style={{background: `linear-gradient(0deg, ${getRgbColor(data.image_hue,0.4)} 0%, ${getRgbColor(data.image_hue, 0)} 100%)` }}>
					<h4>{data.title}</h4>
					<p>{data.image_source}</p>
				</div>
			</div>

			<div className="article_wrap">
				{/* <h4 className="news_title">{data.title}</h4> */}
				<p className="attr">
					<span>{data.recommenders || '作者 / 知乎用户'}</span>
					<a>进入「 知乎」查看原文</a>
				</p>
				<div className="article" dangerouslySetInnerHTML = {{ __html: data.body }}></div>
			</div>

			<div className="footbar">
				<div className="back" onClick={ () => router.back() }>
					<i className="iconfont icon-fenzu"></i>
				</div>
				<ul>
					<li onClick={toComments}>
						<span className="to_comment">
							<i className="iconfont icon-pinglun"></i>
							<em>{extraInfo.comments}</em>
						</span>
					</li>
					<li>
						<span className="praise">
							<i className="iconfont icon-zan"></i>
							<em>{extraInfo.popularity}</em>
						</span>
					</li>
					<li>
						<span className="collect">
							<i className="iconfont icon-shoucang"></i>
						</span>
					</li>
					<li>
						<span className="share">
							<i className="iconfont icon-shangchuan1"></i>
						</span>
					</li>
				</ul>
			</div>
		</Layout>
	)
  
}

Details.getInitialProps = async ( router )=>{
	const { id } = router.query
	const result = await getNewsDetails( id )
	//const extraInfo = await getNewsExtra( id )
	return {
		data: result,
		extraInfo: {}
	}
}

export default withRouter(Details)
