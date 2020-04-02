

import React from 'react';
import { Link , NavLink } from 'react-router-dom';

class NavSid extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
				<div className="navbar-default navbar-side">
		            <div className="sidebar-collapse">
		                <ul className="nav">
		                    <li>
		                		{/**NavLink 判断to跟路径是否以一样，一样添加activeClassName样式**/}
		                        <NavLink exact activeClassName="active-menu" to="/">
		                        	<i className="fa fa-dashboard"></i>
		                        	<span>首页</span>
		                        </NavLink>
		                    </li>
		                    
		                    <li className="active">
		                        <Link to="/product"><i className="fa fa-list"></i><span>图片</span><span className="fa arrow"></span></Link>
		                        <ul className="nav nav-second-level collapse in">
		                            <li>
		                                <NavLink to="/product" activeClassName="active-menu">轮播图片管理</NavLink>
		                            </li>
		                        </ul>
		                    </li>
							<li className="active">
		                        <Link to="/showpic"><i className="fa fa-check-square-o"></i><span>展品管理</span><span className="fa arrow"></span></Link>
		                        <ul className="nav nav-second-level collapse in">
								    <li>
		                                <NavLink to="/showpic" activeClassName="active-menu">展品图片管理</NavLink>
		                            </li>
		                        </ul>
		                    </li>
							<li className="active">
		                        <Link to="/artlist"><i className="fa fa-check-square-o"></i><span>名家管理</span><span className="fa arrow"></span></Link>
		                        <ul className="nav nav-second-level collapse in">
								     <li>
		                                <NavLink to="/artlist" activeClassName="active-menu">雕刻名家信息管理</NavLink>
		                            </li>
		                            
		                        </ul>
		                    </li>
		                   <li className="active">
		                        <Link to="/news"><i className="fa fa-check-square-o"></i><span>新闻</span><span className="fa arrow"></span></Link>
		                        <ul className="nav nav-second-level collapse in">
		                            <li>
		                                <NavLink to="/news" activeClassName="active-menu">新闻管理</NavLink>
		                            </li>
		                            
		                        </ul>
		                    </li>
							<li className="active">
		                        <Link to="/user"><i className="fa fa-check-square-o"></i><span>用户</span><span className="fa arrow"></span></Link>
		                        <ul className="nav nav-second-level collapse in">
		                            <li>
		                                <NavLink to="/user" activeClassName="active-menu">用户密码修改</NavLink>
		                            </li>
		                            
		                        </ul>
		                    </li>
		                </ul>
		            </div>

		        </div>

			)
	}
}

export default NavSid;