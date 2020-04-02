

import Mutil from 'util/mm.jsx'
const _mm 	= new Mutil();
class Order {
	//获取订单列表
	getOrderList(listParam){
		let url = '',
		data = {};
		if(listParam.listType === 'list'){
			url = "/manage/order/list.do";
			data.pageNum = listParam.pageNum;
		}else if(listParam.listType === 'search'){
			url = "/manage/order/search.do";
			data.pageNum		= listParam.pageNum;
			data.orderNo 		= listParam.orderNo;
		}
		return _mm.request({
			type:'post',
			url : url,
			data : data
		})
	}
	//加载订单详情
	// getOrderDetail(orderNumber){
	// 	return _mm.request({
	// 		type:'post',
	// 		url : "/manage/order/detail.do",
	// 		data : {
	// 			orderNo : orderNumber
	// 		}
	// 	})
	// }
	//立即发货
	sendGoods(orderNumber){
		return _mm.request({
			type:'post',
			url : "/manage/order/send_goods.do",
			data : {
				orderNo : orderNumber
			}
		})
	}
}

export default Order;