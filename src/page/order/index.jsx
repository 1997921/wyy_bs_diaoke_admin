

import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import ListSearch from 'page/order/index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';

import Order  from 'service/order-service.jsx';
import Mutil from 'util/mm.jsx';

const _mm 	= new Mutil();
const _Order = new Order();
class OrderList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pageNum : 1,
			list : [],
			listType : 'list'  // list / search
		}
	}
	componentDidMount(){
		this.loadOrderList();
	}
	//加载商品列表
	loadOrderList(){
		let listParam = {};
		listParam.listType 		= this.state.listType;
		listParam.pageNum 		= this.state.pageNum;
		//如搜索的话，传入搜索类型
		if(this.state.listType == 'search'){
			listParam.orderNo 	= this.state.orderNumber;
		}
		//请求接口
		_Order.getOrderList(listParam).then(res => {
			this.setState(res);
		},errMsg => {
			this.setState({
				list : []
			})
			_mm.errorTips(errMsg);
		});
	}
	//当页数发生变化的时候
	onPageNumChange(PageNum){
		this.setState({
			pageNum:PageNum
		},() =>{
			this.loadOrderList();
		})
	}
	
	//搜索
	onSearch(orderNumber){
		let listType = orderNumber === '' ? 'list' : 'search';
		this.setState({
			listType : listType,
			pageNum : 1,
			orderNumber : orderNumber
		}, () => {
			this.loadOrderList();
		})
	}
	render(){
		let tableHeads = ["订单号","收件人","订单状态","订单总价","创建时间","操作"];
		return (
			<div id="page-wrapper">
				<PageTitle title="订单列表" />
				<ListSearch onSearch={ (orderNumber) => {this.onSearch(orderNumber)} }/>
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map( (order,index) =>{
							return (
								<tr key={index}>
									<td><Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link></td>
									<td>{order.receiverName}</td>
									<td>{order.statusDesc}</td>
									<td>￥{order.payment}</td>
									<td>{order.createTime}</td>
									<td>
										<Link to={`/order/detail/${order.orderNo}`}>查看详情</Link>
									</td>
								</tr>
							)
						})
					}
				</TableList>
				{/** 
					current 代表当前页
					total   代表总页数
				**/}
					<Pagination current={this.state.pageNum} total={this.state.total} onChange={(PageNum) => {this.onPageNumChange(PageNum)}}/>
				
			</div>
			);
	}
}

export default OrderList;