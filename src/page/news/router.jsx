//归并新闻信息的路径
import React from 'react';
import { Router,Route,Redirect,Link,Switch } from 'react-router-dom';


import News from 'page/news/index.jsx';
// 新闻列表的详情页
import Newsdetail         from 'page/news/detail.jsx';
//新闻列表的编辑
import NewsEdit         from 'page/news/edit.jsx';
//新闻列表的添加
import Newsadd         from 'page/news/addnews.jsx';


class NewsRouter extends React.Component{
	render(){
		return (
				<Switch>
					<Route path='/news/index' component={News} />
					<Route path='/news/save/:id' component={NewsEdit} />
                    <Route path='/news/detail/:id' component={Newsdetail} />
                    <Route path='/news/add' component={Newsadd} />
					<Redirect exact from='/news' to="/news/index"/>
				</Switch>
			);
	}
}
export default NewsRouter;