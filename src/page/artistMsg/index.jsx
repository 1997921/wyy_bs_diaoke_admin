

import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import ListSearch from 'page/product/index/index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import "./index.scss"

import Product  from 'service/product-service.jsx';
import Mutil from 'util/mm.jsx';

const _mm 	= new Mutil();
const _product = new Product();
class ArtistMsg extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pageNum : 1,
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
		//如搜索的话，传入搜索类型
		if(this.state.listType == 'search'){
			listParam.searchType 	= this.state.searchType;
			listParam.KeyWord = this.state.searchKeyWord;
		}
		//请求接口
		_product.getArtlist(listParam).then(res => {
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
			this.loadProductList();
		})
	}
	//删除名家信息
	art_delete(productId){
		let art_delete=window.confirm("确定删除该名家信息")
		if(art_delete){
			_product.art_delect({
				productId : productId,
			}).then(res => {
				_mm.successTips(res);
				this.loadProductList();
			}, errMsg => {
				_mm.errorTips(errMsg);
			})
		}
	}
		
	render(){
		let tableHeads = [
			{name:'ID',width:'20%'},
			{name:'姓名',width:'20%'},
			{name:'描述',width:'30%'},
			{name:'操作',width:'20%'},
		];
		return (
			<div id="page-wrapper">
				<PageTitle title="雕刻名家信息">
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
									<td>{product.title}</td>
									<td>
										<Link className="opear" to={`/artlist/detail/${product.id}`}>查看详情</Link>
										<Link className="opear" to={`/artlist/save/${product.id}`}>编辑</Link>
										<span className="opear" onClick={()=>{
											  let productId=product.id;
											 this.art_delete(productId)
											}} >删除</span>
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

export default ArtistMsg;