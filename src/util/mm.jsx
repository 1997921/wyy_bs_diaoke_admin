
class MUtil {
	request(param){
		return new Promise( (resolve , reject ) => {
			$.ajax({
				type: param.type || 'get',
				url : param.url || '',
				dataType: param.dataType || 'json',
				data: param.data || null,
				success : res => {
				//{/**success(res){ 有作用域问题**/}
					//数据请求成功
					if( 0 === res.status ){
						//&& 表示前面为true才会执行后面的
						typeof resolve === 'function' && resolve(res.data,res.msg)
					}else if( 10 === res.status ){
						//做登陆
						this.doLogin();
					}else{
						//错误的
						typeof reject === 'function' && reject(res.msg || res.data)
					}
				},
				error : err => {
					//statusText 是http请求里err对象里的东西
					typeof reject === 'function' && reject(err.statusText)
				}
			});
		});
	}
	//跳转登陆
	doLogin(){
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
	}
	//获取url参数
	getUrlParam(name){
		//等号后面碰到&符就不往下匹配
		let queryString = window.location.search.split('?')[1] || '',
			reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
			result = queryString.match(reg);
		//result : ['a=123','','123','&','b=456','','456']
		//decodeURIComponent 解码
		return result ? decodeURIComponent(result[2]) : '';

	}
	//成功提示
	successTips(successMsg){
		alert(successMsg || '操作成功');
	}
	//错误提示
	errorTips(errMsg){
		alert(errMsg || '不对');

	}
	//本地存储
	setStorage(name,data){
		let dataType = typeof data
		//json类型
		if (dataType === 'object') {
			window.localStorage.setItem(name,JSON.stringify(data));
		//基础类型
		} else if( ['number','string','boolean'].indexOf(dataType) >= 0){
			window.localStorage.setItem(name,data);
		}else{
			alert('该类型不能用于本地存储');
		}
	}
	//取出本地存储
	getStorage(name){
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}else{
			return '';
		}
	}
	//删除本地存储
	removeStorage(){
		window.localStorage.removeItem(name);
	}
}

export default MUtil;