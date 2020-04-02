
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router,Route,Redirect,Link,Switch } from 'react-router-dom';

import Layout 		from 'component/layout/index.jsx';

import Home 		from 'page/home/index.jsx';
// 轮播图的展示
import ProductRouter from 'page/product/router.jsx';
// 展品的展示
import ShowRouter    from 'page/showpic/router.jsx'
// 艺术家的展示
import ArtistMsg    from 'page/artistMsg/router.jsx'
import Login 		from 'page/login/index.jsx';
import Errorpage 	from 'page/error/index.jsx';
import OrderList 	from 'page/order/index.jsx';
import OrderDetail 	from 'page/order/detail.jsx';
import News 	from 'page/news/router.jsx';
import AddNews 	from 'page/news/addnews.jsx';
import Useredit from 'page/user/useredit.jsx';
import User from 'page/user/index.jsx';




import 'font-awesome/css/font-awesome.min.css'


class App extends React.Component{
	render(){
		let LayoutRouter = (
			<Layout>
				<Switch>
					{/**Redirect 限制如跳转连接不存在 则指定跳转地址**/}
					{/* 首页 */}
					<Route exact path='/' component={Home} />
					{/* 图片管理 */}
					<Route path='/product' component={ProductRouter} />
					<Route path='/product-category' component={ProductRouter} />
					<Route path='/order/index' component={OrderList} />
					<Route path='/news/addnews' component={AddNews} />
					{/* 展品管理 */}
					<Route path='/showpic' component={ShowRouter} />
					{/* 新闻管理 */}
					<Route path='/news' component={News} />
					<Route path='/order/detail/:orderNumber' component={OrderDetail} />
					{/* 艺术家信息 */}
					<Route path='/artlist' component={ArtistMsg} />
					{/* 用户 */}
					<Route path='/user/index' component={User} />
					<Route path='/user/useredit/:id' component={Useredit} />
					<Redirect exact from='/user' to="/user/index" />
					<Route component={Errorpage} />
				</Switch>
			</Layout>
		)
		return (
				<Router>
					<Switch>
						<Route path='/login' component={Login} />
						<Route path='/' render={ props => LayoutRouter} />
					</Switch>
				</Router>
			);
	}
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)
