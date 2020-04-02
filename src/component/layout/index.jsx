

import React from 'react';
import NavTop from 'component/top-nav/index.jsx';
import NavSid from 'component/sid-nav/index.jsx';

import './theme.css';
import './index.scss';
// 组件容器
class Layout extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
				<div id="wrapper">
					{/**头部模板**/}
					<NavTop />
					{/**侧边导航**/}
					<NavSid />
					{/**子组件**/}
					{this.props.children}
				</div>
			)
	}
}

export default Layout;