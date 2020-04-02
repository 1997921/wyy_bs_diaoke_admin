

import React from 'react';
import {Link} from 'react-router-dom'
import User  from 'service/user-service.jsx'
import Mutil from 'util/mm.jsx'

const _mm   = new Mutil();
const _User = new User();

class NavTop extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            username : _mm.getStorage('userInfo').username || ''
        }
	}
	//退出登录
	onLogout(){
        _User.logout().then(res => {
            _mm.removeStorage('userInfo');
            window.location.href = '/login'
            //this.props.history.push('./login');
        },errMsg => {
            _mm.errorTips(errMsg);
        })
	}
	render(){
		return (
            
				<div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                
                <Link className="navbar-brand" to="index.html">曲阳雕刻</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                        {console.log(this.state.username)}
                        {
                            
                            this.state.username ?
                            <span>欢迎,{this.state.username}</span> :
                            <span>欢迎您</span>
                        }
                        
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        
                        <li>
                        	<a onClick = {() => {this.onLogout()}}>
	                        	<i className="fa fa-sign-out fa-fw"></i> 
	                        	<span>退出登录</span>
	                        </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
			)
	}
}
export default NavTop;