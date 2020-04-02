
import Mutil from 'util/mm.jsx'
const _mm 	= new Mutil();
class User {
	//用户登录
	login(loginInfo){
		return _mm.request({
			type:'post',
			url : '/manage',
			data : loginInfo
		})
	}
	//检查登陆接口数据是否合法
	checkLoginInfo(loginInfo){
		let username = $.trim(loginInfo.username),
			password = $.trim(loginInfo.password);
			//判断用户名
		if(typeof username !== 'string' || username.length === 0){
			return {
				status : false,
				msg : '用户名不能为空'
			}
		}
		//判断密码
		if(typeof password !== 'string' || password.length === 0){
			return {
				status : false,
				msg : '密码不能为空'
			}
		}
		return {
				status : true,
				msg : '验证通过'
			}
	}
	//推出登录
	logout(){
		return _mm.request({
			type:'post',
			url : '/manage/logout.do'
		})
	}
	//用户列表
	getUserList(PageNum){
		return _mm.request({
			type:'post',
			url : '/manage/user/list.do',
			data : {
				pageNum : PageNum
			}
		})
	}
}

export default User;