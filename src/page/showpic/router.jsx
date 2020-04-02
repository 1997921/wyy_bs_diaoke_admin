//归并展品信息的路径
import React from 'react';
import { Router,Route,Redirect,Link,Switch } from 'react-router-dom';


import Show from 'page/showpic/index.jsx';
import ShowEdit         from 'page/showpic/addshow.jsx';
// 展品列表的详情页
import Showdetail         from 'page/showpic/detail.jsx';
//展品列表的编辑
import ShowSave         from 'page/showpic/showsave.jsx';


class ShowRouter extends React.Component{
	render(){
		return (
				<Switch>
					<Route path='/showpic/index' component={Show} />
					<Route path='/showpic/save/:id' component={ShowSave} />
					<Route path='/showpic/addedit/' component={ShowEdit} />
                    <Route path='/showpic/detail/:id' component={Showdetail} />
					<Redirect exact from='/showpic' to="/showpic/index"/>
				</Switch>
			);
	}
}
export default ShowRouter;