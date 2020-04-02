

import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import ListSearch from 'page/product/index/index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';

import Product  from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';


const _mm 	= new Mutil();
const _product = new Product();
class User extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			list : [],
			listType : 'list'
		}
	}
	componentDidMount(){
		this.loadProductList();
	}
	//加载商品列表
	loadProductList(){
		let listParam = {};
		listParam.listType 		= this.state.listType;
		listParam.pageNum 		= this.state.pageNum;
		//请求接口
		_product.getUsertList(listParam).then(res => {
			this.setState(res);
		},errMsg => {
			this.setState({
				list : []
			})
			_mm.errorTips(errMsg);
		});
	}
	render(){
		let tableHeads = [
			{name:'用户ID',width:'10%'},
			{name:'用户名称',width:'20%'},
			{name:'用户密码',width:'20%'},
			{name:'用户邮箱',width:'20%'},
			{name:'联系方式',width:'15%'},
			{name:'操作',width:'15%'},
		];
		return (
			<div id="page-wrapper">
				<PageTitle title="用户信息">
				</PageTitle>
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map( (product,index) =>{
							return (
								<tr key={index}>
									<td>{product.id}</td>
									<td>
										<p>{product.name}</p>
										
									</td>
									<td>{product.password}</td>
									<td>{product.email}</td>
									<td>{product.phone}</td>
									<td>
										<Link className="opear" to={`/user/useredit/${product.id}`}>修改密码</Link>
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

export default User;