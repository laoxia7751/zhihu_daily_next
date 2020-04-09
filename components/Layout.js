import { NavBar, Icon, WingBlank } from 'antd-mobile'
import { withRouter } from 'next/router'
import Head from 'next/head'

export default withRouter(({ router, children, title, mainClass='' }) => (
	<>
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
			<title>{title}</title>
		</Head>
		<div className={mainClass}>
			{children}
		</div>
	</>
))
