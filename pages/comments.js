import Layout from '../components/Layout'
import { withRouter} from 'next/router'
import { Modal, Toast } from 'antd-mobile';
import { getLongComments, getShortComments } from '../api'
import copy from  'copy-to-clipboard';
import { formatTime } from '../utils'

const operation = Modal.operation;
const Comments = ({ router, longComments, shortComments }) => {
    function copyContent(words) {
        copy(words)
        Toast.info('复制成功')
    }
    return (
        <Layout title="评论" mainClass="comments">
            <>
                <div className="header comments_header">
                    <div className="back" onClick={() => router.back()}>
                        <i className="iconfont icon-fenzu"></i>
                    </div>
                    {(longComments.length + shortComments.length) + '条评论'}
                </div>
               {
                   longComments.length > 0 &&
                    <>
                        <div className="total">{longComments.length} 条长评</div>
                        <ul className="comments_list">
                            {
                                longComments.map(item => (
                                    <li key={item.id}>
                                        <span className="avatar" style={{backgroundImage: `url(${item.avatar})`}}></span>
                                        <div className="comment_details">
                                            <div className="author">
                                                <span className="name">{item.author}</span>
                                                <span 
                                                    className="iconfont icon-set" 
                                                    onClick={() =>  operation([
                                                        { text: '复制评论', onPress: () => copyContent(item.content) }
                                                    ])}
                                                />
                                            </div>
                                            <div className="words">{item.content}</div>
                                            <div className="attr">
                                                <span className="datetime">{item.time}</span>
                                                <span className="likes">
                                                    <i>{item.likes}</i>
                                                    <i className="iconfont icon-zan"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                }
                {
                    shortComments.length > 0 &&
                    <>
                        <div className="total">{shortComments.length} 条短评</div>
                        <ul className="comments_list">
                            {
                                shortComments.map(item => (
                                    <li key={item.id}>
                                        <span className="avatar" style={{backgroundImage: `url(${item.avatar})`}}></span>
                                        <div className="comment_details">
                                            <div className="author">
                                                <span className="name">{item.author}</span>
                                                <span className="iconfont icon-set"></span>
                                            </div>
                                            <div className="words">{item.content}</div>
                                            <div className="attr">
                                                <span className="datetime">{item.time}</span>
                                                <span className="likes">
                                                    <i>{item.likes}</i>
                                                    <i className="iconfont icon-zan"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                }
            </>
        </Layout>
    )
}

Comments.getInitialProps = async ( router ) => {
    const { id }  = router.query
    const result = await Promise.all([ getLongComments( id ), getShortComments( id ) ])

    const longComments = formatTime(result[0].comments, 'time')
    const shortComments = formatTime(result[1].comments, 'time')

    return {
		longComments,
		shortComments
	}
}

export default withRouter(Comments)