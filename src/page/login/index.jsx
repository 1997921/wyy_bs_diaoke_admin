

import React from 'react';
import User  from 'service/user-service.jsx'
import Mutil from 'util/mm.jsx'

const _mm 	= new Mutil();
const _User = new User();
import './index.scss';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username : '',
			password : '',
			redirect : _mm.getUrlParam( 'redirect' ) || '/',
		}
	}
	componentWillMount(){
		document.title = '登录 - MMALL ADMIN';
	}
	onInputChange(e){
		let inputName = e.target.name , inputValue = e.target.value
		this.setState({
			[inputName] : inputValue
		})
	}
	onInputKeyUp(e){
		if (e.keyCode == 13) {
			this.onSubmit();
		}
	}
	onSubmit(){
		let loginInfo = {
			username : this.state.username,
			password : this.state.password
		},
			checkResult = _User.checkLoginInfo( loginInfo );
			//验证通过
		if(checkResult.status){
			_User.login(loginInfo).then( (res) => {
				_mm.setStorage('userInfo', res)
				this.props.history.push( this.state.redirect );
			},(errMsg) => {
				_mm.errorTips(errMsg);
			})
		}else{
			_mm.errorTips(checkResult.msg);
		}
		
	}
	render(){
		return (
				
				<div className="col-md-3 col-md-offset-4">
					<div className="panel panel-default login-panel">
						<div className="panel-heading">
							欢迎登陆 —— MMALL管理系统
						</div>
						<div className="panel-body">
							<div>
							  <div className="form-group">
							    <input type="email" name="username" className="form-control" placeholder="请输入用户名" onKeyUp={e => this.onInputKeyUp(e)} onChange = { e => this.onInputChange(e) } />
							  </div>
							  <div className="form-group">
							    <input type="password" name="password" className="form-control" placeholder="请输入密码" onKeyUp={e => this.onInputKeyUp(e)} onChange = { e => this.onInputChange(e) } />
							  </div>
							  <button className="btn btn-lg btn-primary btn-block" onClick={ e => this.onSubmit(e) }>登陆</button>
							</div>
						</div>
					</div>
				</div>
				
			)
	}
}

export default Login;