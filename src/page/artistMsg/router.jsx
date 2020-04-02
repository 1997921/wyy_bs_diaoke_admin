//归并艺术家信息的路径
import React from 'react';
import { Router,Route,Redirect,Link,Switch } from 'react-router-dom';


import Art from 'page/artistMsg/index.jsx';
// 艺术家列表的详情页
import Artdetail         from 'page/artistMsg/detail.jsx';
//展品列表的编辑
import ArtSave         from 'page/artistMsg/artsave.jsx';


class ArtRouter extends React.Component{
	render(){
		return (
				<Switch>
					<Route path='/artlist/index' component={Art} />
					<Route path='/artlist/save/:id' component={ArtSave} />
                    <Route path='/artlist/detail/:id' component={Artdetail} />
					<Redirect exact from='/artlist' to="/artlist/index"/>
				</Switch>
			);
	}
}
export default ArtRouter;