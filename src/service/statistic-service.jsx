


import Mutil from 'util/mm.jsx'
const _mm 	= new Mutil();
class Statistic {
	//首页数据统计
	getHomeCount(loginInfo){
		return _mm.request({
			url : '/manage/statistic',
		})
	}
	
	
}

export default Statistic;