/*
* @Author: Rensen
* @Date:   2019-11-16 23:15:10
* @Last Modified by:   Rensen
* @Last Modified time: 2019-11-21 00:00:44
*/
import React from 'react';
import ReactDom from 'react-dom';

import { HashRouter as Router,Route,Link,Switch } from 'react-router-dom';


class A extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
				
				Component A 
				参数：{this.props.match.params.id}
				<Switch>
					<Route exact path={`${this.props.match.path}`} render={(route) => {return <div>当前是不带参数的A</div>}} />
					<Route path={`${this.props.match.path}/sub`} render={(route) => {return <div>当前是带参数的sub</div>}} />
					<Route path={`${this.props.match.path}/:id`} render={(route) => {return <div>当前是带参数的A，参数：{route.match.params.id}</div>}} />
				</Switch>
			</div>

			)
	}
}


class B extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div>Component B</div>
	}
}

class Wrapper extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
				{/** children 代表用这个容器包含的内容**/}
				<Link to="/a">组件A</Link><br/>
				<Link to="/a/123">/a/123</Link>
				<br/>
				<Link to="/b">组件B</Link><br/>
				<Link to="/a/sub">/a/sub</Link>
				{this.props.children}
				
			</div>
		);
	}
}


ReactDom.render(
  <Router>
    <Wrapper>
	   <Switch>
	    	{/** 获取域名里的参数id**/}
	    	<Route path="/a" component = {A}/>
	    	<Route path="/b" component = {B}/>
    	</Switch>
    </Wrapper>
  </Router>
  ,
  document.getElementById('app')
)